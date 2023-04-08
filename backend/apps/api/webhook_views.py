import json
from datetime import datetime

import requests
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response

from apps.api.models import Document, Picture
from config import settings


@api_view(["GET", "POST"])
def webhook_handler(request):
    request_body = request.body.decode("utf-8")
    json_data = json.loads(request_body)

    if json_data.get("Type") == "SubscriptionConfirmation":
        subscribe_url = json_data.get("SubscribeURL", None)
        if subscribe_url is not None:
            requests.get(subscribe_url)
        return Response(status=status.HTTP_200_OK)

    message = json_data.get("Message")
    if message:
        record = json.loads(message).get("Records")[0]
        if record.get("eventSource") == "aws:s3":
            return s3_handler(json_data)

    return Response(status=status.HTTP_200_OK)


def s3_handler(json_data):
    message = json_data.get("Message")
    record = json.loads(message).get("Records")[0]
    event_name = record.get("eventName")

    if (
        event_name == "ObjectCreated:Post"
        and record.get("s3")
        and record.get("s3").get("bucket")
        and record.get("s3").get("bucket").get("name")
        in [settings.AWS_S3_DOCUMENT_BUCKET_NAME, settings.AWS_S3_PICTURE_BUCKET_NAME]
    ):
        object_key = record.get("s3").get("object").get("key")
        object_key_split = object_key.split("/")
        object_key_prefix = object_key_split[0]
        file_obj_key = f"{object_key_prefix}" + "/${filename}"
        bucket_name = record.get("s3").get("bucket").get("name")
        if bucket_name == settings.AWS_S3_DOCUMENT_BUCKET_NAME:
            file_obj = Document.objects.filter(s3_url=file_obj_key).first()
        elif bucket_name == settings.AWS_S3_PICTURE_BUCKET_NAME:
            file_obj = Picture.objects.filter(s3_url=file_obj_key).first()
        if file_obj:
            file_obj.s3_url = object_key
            file_obj.file_size = int(record.get("s3").get("object").get("size"))
            file_obj.upload_finished_at = datetime.now()
            file_obj.save()

    return Response(status=status.HTTP_200_OK)

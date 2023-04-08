import datetime

import boto3 as boto3
from django.core.validators import MinValueValidator, MaxValueValidator

from config import settings

PERCENTAGE_VALIDATOR = [MinValueValidator(0), MaxValueValidator(100)]
AGE_VALIDATOR = [MinValueValidator(0), MaxValueValidator(100)]
RATE_VALIDATOR = [MinValueValidator(1), MaxValueValidator(5)]


def picture_upload_path(instance):
    return f"{instance.uuid}/" + "${filename}"


def document_upload_path(instance):
    return f"{instance.uuid}/" + "${filename}"


def s3_generate_document_presigned_post(*, file_path):
    s3_client = boto3.client("s3")

    presigned_data = s3_client.generate_presigned_post(
        settings.AWS_S3_DOCUMENT_BUCKET_NAME,
        file_path,
        ExpiresIn=settings.AWS_PRESIGNED_EXPIRY,
    )

    return presigned_data


def s3_generate_picture_presigned_post(*, file_path):
    s3_client = boto3.client("s3")

    presigned_data = s3_client.generate_presigned_post(
        settings.AWS_S3_PICTURE_BUCKET_NAME,
        file_path,
        Fields={"Content-Type": "image/jpeg"},
        Conditions=[["starts-with", "$Content-Type", ""]],
        ExpiresIn=settings.AWS_PRESIGNED_EXPIRY,
    )

    return presigned_data


def year_choices():
    return [(r, r) for r in range(1900, datetime.date.today().year)]

from apps.core.email import AdminsEmailNotification


class NewInquiryEmailNotification(AdminsEmailNotification):
    template = "email/email_new_inquiry.html"

    def __init__(self, inquiry):
        super().__init__()
        self.inquiry = inquiry

    def get_subject(self):
        return f"New inquiry has been created"

    def get_template_context(self):
        return {
            "inquiry": self.inquiry,
        }

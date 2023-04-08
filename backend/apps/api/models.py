import uuid

from django.db import models

from model_utils.models import TimeStampedModel

from apps.api import utils
from apps.users.models import User


class MineralType(TimeStampedModel):
    MINERAL_TYPE_OIL_GAS = "Oil & Gas"
    MINERAL_TYPE_OIL = "Oil"
    MINERAL_TYPE_GAS = "Gas"
    MINERAL_TYPE_WATER = "Water"
    MINERAL_TYPE_CARBON = "Carbon"
    MINERAL_TYPE_RARE_EARTH = "Rare Earth"
    MINERAL_TYPE_OTHER = "Other"

    MINERAL_TYPES = (
        (MINERAL_TYPE_OIL_GAS, "Oil & Gas"),
        (MINERAL_TYPE_OIL, "Oil"),
        (MINERAL_TYPE_GAS, "Gas"),
        (MINERAL_TYPE_WATER, "Water"),
        (MINERAL_TYPE_CARBON, "Carbon"),
        (MINERAL_TYPE_RARE_EARTH, "Rare Earth"),
        (MINERAL_TYPE_OTHER, "Other"),
    )

    title = models.CharField(
        max_length=128, choices=MINERAL_TYPES, verbose_name="Mineral Type"
    )


class Property(TimeStampedModel):
    owner = models.ForeignKey(
        "LandOwner",
        on_delete=models.PROTECT,
        related_name="properties",
    )
    alias = models.CharField(max_length=256)
    legal_description = models.TextField()
    comments = models.TextField()
    state = models.ForeignKey(
        "cities_light.Region",
        on_delete=models.PROTECT,
        related_name="properties",
    )
    county = models.ForeignKey(
        "cities_light.SubRegion",
        on_delete=models.PROTECT,
        related_name="properties",
    )
    property_address = models.CharField(
        max_length=256, null=True, blank=True, verbose_name="Property Address"
    )
    property_city = models.ForeignKey(
        "cities_light.City",
        on_delete=models.PROTECT,
    )
    property_state = models.ForeignKey(
        "cities_light.Region",
        on_delete=models.PROTECT,
    )
    property_zipcode = models.CharField(
        max_length=256, null=True, blank=True, verbose_name="Property Zip Code"
    )

    def __str__(self):
        return f"{self.alias} ({self.id})"


class Mineral(TimeStampedModel):
    DOCUMENT_TYPE_CONVEYANCE_COPY = "Conveyance Copy"
    DOCUMENT_TYPE_DIVISION_ORDER = "Division Order"
    DOCUMENT_TYPE_WILL = "Will"
    DOCUMENT_TYPE_PROBATE = "Probate"
    DOCUMENT_TYPE_AOH = "AOH"
    DOCUMENT_TYPE_LEASE_COPY = "Lease Copy"
    DOCUMENT_TYPE_CHECK_STUB_ROYALTY_PAYMENT = "Check Stub / Royalty Payment"

    DOCUMENT_TYPES = (
        (DOCUMENT_TYPE_CONVEYANCE_COPY, "Conveyance Copy"),
        (DOCUMENT_TYPE_DIVISION_ORDER, "Division Order"),
        (DOCUMENT_TYPE_WILL, "Will"),
        (DOCUMENT_TYPE_PROBATE, "Probate"),
        (DOCUMENT_TYPE_AOH, "AOH"),
        (DOCUMENT_TYPE_LEASE_COPY, "Lease Copy"),
        (DOCUMENT_TYPE_CHECK_STUB_ROYALTY_PAYMENT, "Check Stub / Royalty Payment"),
    )

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="minerals",
    )
    mineral_type = models.ForeignKey(
        MineralType,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
    )
    mineral_type_custom = models.CharField(
        max_length=256, null=True, blank=True, verbose_name="Custom Mineral Type"
    )
    document_type = models.CharField(
        max_length=64, choices=DOCUMENT_TYPES, verbose_name="Document Type"
    )
    percent_owned = models.FloatField(
        null=True,
        blank=True,
        verbose_name="Deal value preference min",
        validators=utils.PERCENTAGE_VALIDATOR,
    )


class LandOwner(TimeStampedModel):
    OWNER_CATEGORY_TRUST = "Trust"
    OWNER_CATEGORY_LLC = "LLC"
    OWNER_CATEGORY_LEGAL_ENTITY = "Legal Entity"

    OWNER_CATEGORIES = (
        (OWNER_CATEGORY_TRUST, "Trust"),
        (OWNER_CATEGORY_LLC, "LLC"),
        (OWNER_CATEGORY_LEGAL_ENTITY, "Legal Entity"),
    )

    PREFERRED_CONTACT_METHOD_PHONE = "Phone"
    PREFERRED_CONTACT_METHOD_TEXT = "Text"
    PREFERRED_CONTACT_METHOD_EMAIL = "Email"
    PREFERRED_CONTACT_METHOD_MAIL = "Mail"

    PREFERRED_CONTACT_METHODS = (
        (PREFERRED_CONTACT_METHOD_PHONE, "Phone"),
        (PREFERRED_CONTACT_METHOD_TEXT, "Text"),
        (PREFERRED_CONTACT_METHOD_EMAIL, "Email"),
        (PREFERRED_CONTACT_METHOD_MAIL, "Mail"),
    )

    RIGHTS_FOR_YOURSELF = "Self"
    RIGHTS_FOR_OTHER = "Other"
    RIGHTS_FOR_BOTH = "Both self and family members"

    RIGHTS_FOR = (
        (RIGHTS_FOR_YOURSELF, "Self"),
        (RIGHTS_FOR_OTHER, "Other"),
        (RIGHTS_FOR_BOTH, "Both self and family members"),
    )

    TRI_ANSWER_YES = "Yes"
    TRI_ANSWER_NO = "No"
    TRI_ANSWER_NOT_SURE = "Not Sure"

    TRI_ANSWERS = (
        (TRI_ANSWER_YES, "Yes"),
        (TRI_ANSWER_NO, "No"),
        (TRI_ANSWER_NOT_SURE, "Not Sure"),
    )

    HOW_OWNERSHIP_PURCHASE = "Purchase"
    HOW_OWNERSHIP_INHERITED = "Inherited"
    HOW_OWNERSHIP_NOT_SURE = "Not Sure"

    HOW_OWNERSHIP = (
        (HOW_OWNERSHIP_PURCHASE, "Purchase"),
        (HOW_OWNERSHIP_INHERITED, "Inherited"),
        (HOW_OWNERSHIP_NOT_SURE, "Not Sure"),
    )

    user = models.OneToOneField(
        User,
        primary_key=True,
        on_delete=models.PROTECT,
        verbose_name="User",
        related_name="owner",
    )

    # To be filled in step 1
    first_name = models.CharField(max_length=30, verbose_name="First name")
    middle_name = models.CharField(
        max_length=30, null=True, blank=True, verbose_name="First name"
    )
    last_name = models.CharField(max_length=30, verbose_name="Last name")
    maiden_name = models.CharField(
        max_length=128, null=True, blank=True, verbose_name="Maiden name"
    )
    aka = models.CharField(max_length=256, null=True, blank=True, verbose_name="AKA")
    owner_category = models.CharField(
        max_length=20, choices=OWNER_CATEGORIES, verbose_name="Owner Category"
    )
    physical_street = models.CharField(
        max_length=256, verbose_name="Physical Street Address"
    )
    physical_city = models.ForeignKey(
        "cities_light.City",
        on_delete=models.PROTECT,
        related_name="owners",
    )
    physical_state = models.ForeignKey(
        "cities_light.Region",
        on_delete=models.PROTECT,
        related_name="owners",
    )
    physical_zipcode = models.CharField(
        max_length=256, verbose_name="Physical Zip Code"
    )
    mailing_street = models.CharField(
        max_length=256, verbose_name="Mailing Street Address"
    )
    mailing_city = models.ForeignKey(
        "cities_light.City",
        on_delete=models.PROTECT,
        related_name="mailing_owners",
    )
    mailing_state = models.ForeignKey(
        "cities_light.Region",
        on_delete=models.PROTECT,
        related_name="mailing_owners",
    )
    mailing_zipcode = models.CharField(max_length=256, verbose_name="Mailing Zip Code")

    # To be filled in step 2
    preferred_contact_method = models.CharField(
        max_length=20,
        choices=PREFERRED_CONTACT_METHODS,
        verbose_name="Preferred Contact Method",
    )
    cell_phone = models.CharField(max_length=30, verbose_name="Cell Phone")
    secondary_phone = models.CharField(
        max_length=30, null=True, blank=True, verbose_name="Secondary Phone"
    )
    contact_name = models.CharField(max_length=128, verbose_name="Contact Name")
    contact_phone = models.CharField(max_length=30, verbose_name="Contact Phone")
    contact_email = models.EmailField(
        max_length=255, null=True, blank=True, verbose_name="Contact Email"
    )

    # To be filled in step 3
    rights_for = models.CharField(
        max_length=128, choices=RIGHTS_FOR, verbose_name="Rights for"
    )
    is_rights_inherit_in_a_will = models.CharField(
        max_length=20, choices=TRI_ANSWERS, verbose_name="Rights inherits in a will"
    )
    is_rights_probated = models.CharField(
        max_length=20, choices=TRI_ANSWERS, verbose_name="Rights inherits in a will"
    )
    has_attorney = models.CharField(
        max_length=20, choices=TRI_ANSWERS, verbose_name="Has attorney for estate"
    )
    attorney_first_name = models.CharField(
        max_length=30, null=True, blank=True, verbose_name="Attorney First Name"
    )
    attorney_last_name = models.CharField(
        max_length=30, null=True, blank=True, verbose_name="Attorney Last name"
    )
    attorney_company_name = models.CharField(
        max_length=128, null=True, blank=True, verbose_name="Attorney Company Name"
    )
    attorney_street = models.CharField(
        max_length=256, null=True, blank=True, verbose_name="Attorney Street Address"
    )
    attorney_city = models.ForeignKey(
        "cities_light.City",
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name="attorney_owners",
    )
    attorney_state = models.ForeignKey(
        "cities_light.Region",
        null=True,
        blank=True,
        on_delete=models.PROTECT,
        related_name="attorney_owners",
    )
    attorney_zipcode = models.CharField(
        max_length=256, null=True, blank=True, verbose_name="Attorney Zip Code"
    )

    # To be filled in step 4
    how_many_properties = models.CharField(
        max_length=30,
        null=True,
        blank=True,
        verbose_name="How many properties do you own?",
    )
    how_ownership = models.CharField(
        max_length=20,
        choices=HOW_OWNERSHIP,
        verbose_name="How did you come into ownership?",
    )

    def __str__(self):
        return f"{self.user.email} ({self.user.id})"


class Heir(TimeStampedModel):
    HEIR_TYPE_PREVIOUS = "Previous"
    HEIR_TYPE_POTENTIAL = "Potential"

    HEIR_TYPES = (
        (HEIR_TYPE_PREVIOUS, "Previous"),
        (HEIR_TYPE_POTENTIAL, "Potential"),
    )

    RELATIONSHIP_PARENT = "Parent"
    RELATIONSHIP_GRANDPARENT = "Grandparent"
    RELATIONSHIP_SPOUSE = "Spouse"
    RELATIONSHIP_SIBLING = "Sibling"
    RELATIONSHIP_SON = "Son"
    RELATIONSHIP_GRANDSON = "Grandson"
    RELATIONSHIP_DAUGHTER = "Daughter"
    RELATIONSHIP_GRANDDAUGHTER = "Granddaughter"
    RELATIONSHIP_OTHER = "Other"

    RELATIONSHIPS = (
        (RELATIONSHIP_PARENT, "Parent"),
        (RELATIONSHIP_GRANDPARENT, "Grandparent"),
        (RELATIONSHIP_SPOUSE, "Spouse"),
        (RELATIONSHIP_SIBLING, "Sibling"),
        (RELATIONSHIP_SON, "Son"),
        (RELATIONSHIP_GRANDSON, "Grandson"),
        (RELATIONSHIP_DAUGHTER, "Daughter"),
        (RELATIONSHIP_GRANDDAUGHTER, "Granddaughter"),
        (RELATIONSHIP_OTHER, "Other"),
    )

    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name="heirs",
    )
    heir_type = models.CharField(
        max_length=20,
        choices=HEIR_TYPES,
        verbose_name="Heir Type",
    )
    relationship = models.CharField(
        max_length=64,
        choices=RELATIONSHIPS,
        verbose_name="Relationship",
    )
    relationship_custom = models.CharField(
        max_length=256,
        null=True,
        blank=True,
        verbose_name="Relationship Custom",
    )
    first_name = models.CharField(max_length=30, verbose_name="First name")
    last_name = models.CharField(max_length=30, verbose_name="Last name")
    deceased = models.BooleanField(
        default=False, null=True, blank=True, verbose_name="Deceased"
    )
    died_city = models.ForeignKey(
        "cities_light.City",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="heirs",
    )
    died_state = models.ForeignKey(
        "cities_light.Region",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="heirs",
    )
    died_country = models.ForeignKey(
        "cities_light.Country",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="heirs",
    )
    died_year = models.IntegerField(
        choices=utils.year_choices(),
        null=True,
        blank=True,
    )
    estate_probated = models.BooleanField(
        default=False, null=True, blank=True, verbose_name="Estate probated"
    )
    probate_city = models.ForeignKey(
        "cities_light.City",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    probate_state = models.ForeignKey(
        "cities_light.Region",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    probate_country = models.ForeignKey(
        "cities_light.Country",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
    )
    age = models.IntegerField(
        null=True,
        blank=True,
        verbose_name="Age",
        validators=utils.AGE_VALIDATOR,
    )
    included_in_will = models.BooleanField(
        default=False, null=True, blank=True, verbose_name="Included in will"
    )
    potential_street = models.CharField(
        max_length=256, null=True, blank=True, verbose_name="Potential Street Address"
    )
    potential_city = models.ForeignKey(
        "cities_light.City",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="heirs_of_potential",
    )
    potential_state = models.ForeignKey(
        "cities_light.Region",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="heirs_of_potential",
    )
    potential_zipcode = models.CharField(
        max_length=256, null=True, blank=True, verbose_name="Potential Zip Code"
    )


class Will(TimeStampedModel):
    heir = models.ForeignKey(
        Heir,
        on_delete=models.CASCADE,
        related_name="wills",
    )
    description = models.TextField()
    location_of_will = models.CharField(
        max_length=256, null=True, blank=True, verbose_name="Location of will"
    )
    location_of_will_contact_phone = models.CharField(
        max_length=256,
        null=True,
        blank=True,
        verbose_name="Location of will contact phone",
    )


class Inquiry(TimeStampedModel):
    CATEGORY_BUY_GROW_PORTFOLIO = "Buy / Grow Portfolio"
    CATEGORY_SELL = "Sell"
    CATEGORY_GET_CONNECTED_WITH_SERVICE = "Get Connected with Service"
    CATEGORY_VISITOR = "Visitor"

    CATEGORIES = (
        (CATEGORY_BUY_GROW_PORTFOLIO, "Buy / Grow Portfolio"),
        (CATEGORY_SELL, "Sell"),
        (CATEGORY_GET_CONNECTED_WITH_SERVICE, "Get Connected with Service"),
        (CATEGORY_VISITOR, "Visitor"),
    )

    STATUS_PENDING = "Pending"
    STATUS_IN_PROGRESS = "In Progress"
    STATUS_NEED_ATTENTION = "Needs Attention"
    STATUS_COMPLETE = "Complete"

    STATUSES = (
        (STATUS_PENDING, "Pending"),
        (STATUS_IN_PROGRESS, "In Progress"),
        (STATUS_NEED_ATTENTION, "Needs Attention"),
        (STATUS_COMPLETE, "Complete"),
    )

    LOOKING_FOR_PURCHASE = "Purchase"
    LOOKING_FOR_LEASE = "Lease"
    LOOKING_FOR_NOT_SURE = "Not Sure"

    LOOKING_FORS = (
        (LOOKING_FOR_PURCHASE, "Pending"),
        (LOOKING_FOR_LEASE, "In Progress"),
        (LOOKING_FOR_NOT_SURE, "Complete"),
    )

    owner = models.ForeignKey(
        "LandOwner",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="inquiries",
    )
    category = models.CharField(
        max_length=64,
        choices=CATEGORIES,
        verbose_name="Category",
    )
    initiated_at = models.DateTimeField(blank=True, null=True)
    status = models.CharField(
        max_length=64,
        choices=STATUSES,
        default=STATUS_PENDING,
        verbose_name="Status",
    )
    looking_for = models.CharField(
        max_length=64,
        choices=LOOKING_FORS,
        null=True,
        blank=True,
        verbose_name="Looking for",
    )
    minerals_of_interest = models.ManyToManyField(
        "MineralType",
        related_name="inquiries",
        verbose_name="Minerals of interest",
    )
    looking_state = models.ForeignKey(
        "cities_light.Region",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="inquiries",
    )
    looking_country = models.ForeignKey(
        "cities_light.Country",
        on_delete=models.PROTECT,
        null=True,
        blank=True,
        related_name="inquiries",
    )
    comment = models.TextField()
    properties = models.ManyToManyField(
        "Property",
        related_name="inquiries",
        verbose_name="Properties",
    )
    services = models.ManyToManyField(
        "ServiceCompanyService",
        related_name="inquiries",
        verbose_name="What kind of service do you need help with today",
    )


class InquirySellMineral(TimeStampedModel):
    inquiry = models.ForeignKey(
        "Inquiry",
        on_delete=models.PROTECT,
    )
    mineral = models.ForeignKey(
        "Mineral",
        on_delete=models.PROTECT,
    )
    wish_percent_to_sell = models.FloatField(
        verbose_name="% wishing to sell",
        validators=utils.PERCENTAGE_VALIDATOR,
    )


class InquiryServiceCompany(TimeStampedModel):
    inquiry = models.ForeignKey(
        "Inquiry",
        on_delete=models.PROTECT,
        related_name="inquiry_service_companies",
    )
    service_company = models.ForeignKey(
        "ServiceCompany",
        on_delete=models.PROTECT,
        related_name="inquiries",
    )
    overall_experience_rate = models.IntegerField(
        verbose_name="Overall experience rate",
        validators=utils.RATE_VALIDATOR,
    )
    timeline_rate = models.IntegerField(
        verbose_name="Timeline rate",
        validators=utils.RATE_VALIDATOR,
    )
    completeness_of_project_rate = models.IntegerField(
        verbose_name="Completeness of project rate",
        validators=utils.RATE_VALIDATOR,
    )
    rate_comment = models.TextField(
        verbose_name="Rate comment",
    )


class Message(TimeStampedModel):
    sender = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="messages_sent",
    )
    recipient = models.ForeignKey(
        User,
        on_delete=models.PROTECT,
        related_name="messages_received",
    )
    content = models.TextField(null=True, blank=True)


class ServiceCompany(TimeStampedModel):
    LOOK_FOR_PROPERTIES_PRODUCING = "Producing"
    LOOK_FOR_PROPERTIES_NON_PRODUCING = "Non-Producing"
    LOOK_FOR_PROPERTIES_NOT_SURE = "Not Sure"

    LOOK_FOR_PROPERTIES = (
        (LOOK_FOR_PROPERTIES_PRODUCING, "Producing"),
        (LOOK_FOR_PROPERTIES_NON_PRODUCING, "Non-Producing"),
        (LOOK_FOR_PROPERTIES_NOT_SURE, "Not Sure"),
    )

    INTERESTED_IN_OPERATED = "Operated"
    INTERESTED_IN_NON_OPERATED = "Non-Operated"
    INTERESTED_IN_NOT_SURE = "not_sure"

    INTERESTED_IN = (
        (INTERESTED_IN_OPERATED, "Operated"),
        (INTERESTED_IN_NON_OPERATED, "Non-Operated"),
        (INTERESTED_IN_NOT_SURE, "Not Sure"),
    )

    user = models.OneToOneField(
        User,
        primary_key=True,
        on_delete=models.PROTECT,
        verbose_name="User",
        related_name="service_company",
    )
    company_name = models.CharField(max_length=128, verbose_name="Company Name")
    address = models.CharField(max_length=256, verbose_name="Address")
    city = models.ForeignKey(
        "cities_light.City",
        on_delete=models.PROTECT,
    )
    state = models.ForeignKey(
        "cities_light.Region",
        on_delete=models.PROTECT,
    )
    zipcode = models.CharField(max_length=256, verbose_name="Zip Code")
    services = models.ManyToManyField(
        "ServiceCompanyService",
        related_name="service_companies",
        verbose_name="Services offered",
    )
    look_for_properties = models.CharField(
        max_length=20,
        choices=LOOK_FOR_PROPERTIES,
        verbose_name="Looking for properties that are",
    )
    look_for_minerals = models.ManyToManyField(
        "MineralType",
        verbose_name="Minerals you are looking for",
    )
    look_for_minerals_custom = models.CharField(
        max_length=256,
        null=True,
        blank=True,
        verbose_name="Custom minerals you are looking for",
    )
    interested_in = models.CharField(
        max_length=20, choices=INTERESTED_IN, verbose_name="Interested in"
    )
    deal_value_preference_min = models.FloatField(
        null=True, blank=True, verbose_name="Deal value preference min"
    )
    deal_value_preference_max = models.FloatField(
        null=True, blank=True, verbose_name="Deal value preference max"
    )
    certification_types = models.ManyToManyField(
        "CertificationType",
        through="ServiceCompanyCertificationRelation",
    )
    website_url = models.URLField(blank=True, verbose_name="Zip Code")
    photo = models.OneToOneField(
        "Picture",
        null=True,
        blank=True,
        on_delete=models.PROTECT,
    )

    def __str__(self):
        return f"{self.user.email} ({self.user.id})"


class ServiceCompanyContact(TimeStampedModel):
    first_name = models.CharField(max_length=30, verbose_name="First Name")
    last_name = models.CharField(max_length=30, verbose_name="Last name")
    service_company = models.ForeignKey(
        ServiceCompany,
        on_delete=models.CASCADE,
        related_name="contacts",
    )


class ServiceCompanyPhone(TimeStampedModel):
    phone = models.CharField(max_length=30, verbose_name="Phone")
    service_company = models.ForeignKey(
        ServiceCompany,
        on_delete=models.CASCADE,
        related_name="phones",
    )


class ServiceCompanyPreferredState(TimeStampedModel):
    state = models.ForeignKey(
        "cities_light.Region",
        on_delete=models.PROTECT,
    )
    service_company = models.ForeignKey(
        ServiceCompany,
        on_delete=models.CASCADE,
        related_name="preferred_states",
    )


class ServiceCompanySocialLink(TimeStampedModel):
    social_link = models.URLField(max_length=30, verbose_name="Social link")
    service_company = models.ForeignKey(
        ServiceCompany,
        on_delete=models.CASCADE,
        related_name="social_links",
    )


class ServiceCompanyService(TimeStampedModel):
    SERVICE_LOAN_AGAINST_ASSET = "Loan Against Assets"
    SERVICE_ESTATE_LAWYER_PLANNING = "Estate Lawyer - Planning"
    SERVICE_ESTATE_LAWYER_PROBATE = "Estate Lawyer - Probate"
    SERVICE_OIL_GAS_LAWYER = "Oil & Gas Lawyer"
    SERVICE_APPRAISE_ASSETS = "Appraise Assets"
    SERVICE_LANDMAN_OWNERSHIP_ISSUES = "Landman - Ownership Issues"
    SERVICE_LANDMAN_LEASE_NEGOTIATION = "Landman - Lease Negotiation"
    SERVICE_LANDMAN_COURTHOUSE_WORK = "Landman - Courthouse Work"
    SERVICE_LANDMAN_ESCHEATMENT_ISSUES = "Landman - Escheatment Issues"
    SERVICE_DIVISION_ORDER_ASSISTANCE = "Division Order Assistance"
    SERVICE_ESTATE_MANAGEMENT_FIRMS = "Estate Management Firms"
    SERVICE_AUDITING_REVENUE = "Auditing Revenue"
    SERVICE_CPA_TAX_HELP = "CPA - Tax Help"
    SERVICE_SELL_ASSETS_AUCTION = "Sell Assets - Auction"
    SERVICE_SELL_ASSETS_BROKER = "Sell Assets - Broker"

    SERVICES = (
        (SERVICE_LOAN_AGAINST_ASSET, "Loan Against Assets"),
        (SERVICE_ESTATE_LAWYER_PLANNING, "Estate Lawyer - Planning"),
        (SERVICE_ESTATE_LAWYER_PROBATE, "Estate Lawyer - Probate"),
        (SERVICE_OIL_GAS_LAWYER, "Oil & Gas Lawyer"),
        (SERVICE_APPRAISE_ASSETS, "Appraise Assets"),
        (SERVICE_LANDMAN_OWNERSHIP_ISSUES, "Landman - Ownership Issues"),
        (SERVICE_LANDMAN_LEASE_NEGOTIATION, "Landman - Lease Negotiation"),
        (SERVICE_LANDMAN_COURTHOUSE_WORK, "Landman - Courthouse Work"),
        (SERVICE_LANDMAN_ESCHEATMENT_ISSUES, "Landman - Escheatment Issues"),
        (SERVICE_DIVISION_ORDER_ASSISTANCE, "Division Order Assistance"),
        (SERVICE_ESTATE_MANAGEMENT_FIRMS, "Estate Management Firms"),
        (SERVICE_AUDITING_REVENUE, "Auditing Revenue"),
        (SERVICE_CPA_TAX_HELP, "CPA - Tax Help"),
        (SERVICE_SELL_ASSETS_AUCTION, "Sell Assets - Auction"),
        (SERVICE_SELL_ASSETS_BROKER, "Sell Assets - Broker"),
    )

    service = models.CharField(
        max_length=128, choices=SERVICES, verbose_name="Owner Category"
    )


class CertificationType(TimeStampedModel):
    CERTIFICATION_TYPE_RL = "Registered Landman"
    CERTIFICATION_TYPE_RPL = "Registered Petroleum Landman"
    CERTIFICATION_TYPE_CPL = "Certified Petroleum Landman"
    CERTIFICATION_TYPE_CPLTA = "Certified Professional Lease and Title Analyst"
    CERTIFICATION_TYPE_PLM = "Petroleum Land Management"
    CERTIFICATION_TYPE_CPA = "Certified Public Accountant"
    CERTIFICATION_TYPE_CFP = "Certified Financial Planner"
    CERTIFICATION_TYPE_JD = "Juris Doctor"
    CERTIFICATION_TYPE_OIL_GAS_MINERAL_LAW = "Oil, Gas, and Mineral Law"
    CERTIFICATION_TYPE_ESTATE_PLANNING_PROBATE_LAW = "Estate Planning and Probate Law"
    CERTIFICATION_TYPE_RMM = "Registered Mineral Manager"
    CERTIFICATION_TYPE_CMM = "Certified Minerals Manager"
    CERTIFICATION_TYPE_CTFA = "Certified Trust and Fiduciary Advisor"
    CERTIFICATION_TYPE_CFTEA = "Certificate in Trust Administration"
    CERTIFICATION_TYPE_AEP = "Accredited Estate Planner"
    CERTIFICATION_TYPE_CTEP = "Chartered Trust and Estate Planners"
    CERTIFICATION_TYPE_CEP = "Certified Estate Planner"
    CERTIFICATION_TYPE_CDOE = "Certified Division Order Analyst"

    CERTIFICATION_TYPES = (
        (CERTIFICATION_TYPE_RL, "Registered Landman"),
        (CERTIFICATION_TYPE_RPL, "Registered Petroleum Landman"),
        (CERTIFICATION_TYPE_CPL, "Certified Petroleum Landman"),
        (CERTIFICATION_TYPE_CPLTA, "Certified Professional Lease and Title Analyst"),
        (CERTIFICATION_TYPE_PLM, "Petroleum Land Management"),
        (CERTIFICATION_TYPE_CPA, "Certified Public Accountant"),
        (CERTIFICATION_TYPE_CFP, "Certified Financial Planner"),
        (CERTIFICATION_TYPE_JD, "Juris Doctor"),
        (CERTIFICATION_TYPE_OIL_GAS_MINERAL_LAW, "Oil, Gas, and Mineral Law"),
        (
            CERTIFICATION_TYPE_ESTATE_PLANNING_PROBATE_LAW,
            "Estate Planning and Probate Law",
        ),
        (CERTIFICATION_TYPE_RMM, "Registered Mineral Manager"),
        (CERTIFICATION_TYPE_CMM, "Certified Minerals Manager"),
        (CERTIFICATION_TYPE_CTFA, "Certified Trust and Fiduciary Advisor"),
        (CERTIFICATION_TYPE_CFTEA, "Certificate in Trust Administration"),
        (CERTIFICATION_TYPE_AEP, "Accredited Estate Planner"),
        (CERTIFICATION_TYPE_CTEP, "Chartered Trust and Estate Planners"),
        (CERTIFICATION_TYPE_CEP, "Certified Estate Planner"),
        (CERTIFICATION_TYPE_CDOE, "Certified Division Order Analyst"),
    )

    title = models.CharField(
        max_length=128,
        choices=CERTIFICATION_TYPES,
        verbose_name="Certification Type Title",
    )


class ServiceCompanyCertificationRelation(TimeStampedModel):
    service_company = models.ForeignKey(
        ServiceCompany,
        on_delete=models.CASCADE,
        related_name="certifications",
    )
    certification_type = models.ForeignKey(
        CertificationType,
        on_delete=models.PROTECT,
    )
    certification_number = models.CharField(
        max_length=128, verbose_name="Certification Number"
    )


class Document(TimeStampedModel):
    uuid = models.UUIDField(
        primary_key=True,
        unique=True,
        editable=False,
        default=uuid.uuid4,
        verbose_name="UUID",
    )
    property = models.ForeignKey(
        Property,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="documents",
    )
    mineral = models.ForeignKey(
        Mineral,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="documents",
    )
    will = models.ForeignKey(
        Will,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="documents",
    )
    message = models.ForeignKey(
        Message,
        null=True,
        blank=True,
        on_delete=models.CASCADE,
        related_name="documents",
    )
    s3_url = models.FileField(
        upload_to=utils.document_upload_path, blank=True, null=True
    )
    file_size = models.IntegerField(null=True, blank=True)
    upload_finished_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.s3_url} ({self.uuid})"


class Picture(TimeStampedModel):
    uuid = models.UUIDField(
        primary_key=True,
        unique=True,
        editable=False,
        default=uuid.uuid4,
        verbose_name="UUID",
    )
    s3_url = models.FileField(
        upload_to=utils.document_upload_path, blank=True, null=True
    )
    file_size = models.IntegerField(null=True, blank=True)
    upload_finished_at = models.DateTimeField(blank=True, null=True)

    def __str__(self):
        return f"{self.s3_url} ({self.uuid})"

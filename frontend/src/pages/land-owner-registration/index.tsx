import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import { Footer } from '../../components/footer.component';
import { Header } from '../../components/header.component';
import { BreadcrumbComponent } from './components/breadcrumb.component';
import { ContactInformationComponent } from './components/contact-information.component';
import { LegalInformationComponent } from './components/legal-information.component';
import { PersonalOwnerInformationComponent } from './components/personal-owner-information.component';
import { PropertyMineralInformationComponent } from './components/property-mineral-information.component';
import { VerificationComponent } from './components/verification.component';
import { registerLandOwner } from '../../services/registration.action';
import { toast } from 'react-toastify';

interface CustomProps {
  navigation?: any;
}

export const LandOwnerRegistrationPage: React.FC<CustomProps> = ({
  navigation,
}) => {
  const classes = styles();
  const navigate = useNavigate();
  const [agreeVerification, setAgreeVerification] = useState(false);
  const [data, setData] = useState({} as any);
  const [agreed, setAgreed] = useState(false);
  const [step, setStep] = useState(1);

  const onBackHandler = () => {
    if (step === 1) {
      setAgreeVerification(false);
      setAgreed(false);
    } else if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    } else if (step === 4) {
      setStep(3);
    }
  };

  const onPersonalOwnerInfoContinue = () => {
    setStep(2);
  };

  const onContactInfoContinue = () => {
    setStep(3);
  };

  const onLegalInfoContinue = () => {
    setStep(4);
  };

  const inputHandler = (obj: Record<string, any>) => {
    setData({ ...data, ...obj });
  };

  const onSubmit = () => {
    const payload = {
      email: data.email,
      password1: data.password1,
      password2: data.password2,
      first_name: data.firstName,
      middle_name: data.middleName || '',
      last_name: data.lastName,
      maiden_name: data.maidenName || '',
      aka: data.aka,
      owner_category: data.category.value,
      physical_street: data.physicalAddress,
      physical_city: data.city.value,
      physical_state: data.state.value,
      physical_zipcode: data.zipCode,
      mailing_street: data.mailingAddress || data.physicalAddress,
      mailing_city: data.mailingCity?.value || data.city.value,
      mailing_state: data.mailingState?.value || data.state.value,
      mailing_zipcode: data.mailingZipCode || data.zipCode,
      preferred_contact_method: data.preferredContactMethod.value,
      cell_phone: data.phone,
      secondary_phone: data.secondaryPhone,
      contact_name: data.emergencyContactName,
      contact_phone: data.emergencyContactPhone,
      contact_email: data.emergencyContactEmail,
      rights_for: data.rightsFor,
      is_rights_inherit_in_a_will: data.isRightsInheritInAWill,
      is_rights_probated: data.isRightsProbated,
      has_attorney: data.hasAttorney,
      attorney_first_name: data.attorneyFirstname,
      attorney_last_name: data.attorneyLastname,
      attorney_company_name: data.attorneyCompanyname,
      attorney_street: data.attorneyStreet,
      // attorney_county: data.attorneyCounty.value,
      attorney_city: data.attorneyCity?.value,
      attorney_state: data.attorneyState?.value,
      attorney_zipcode: data.attorneyZipCode,
      how_many_properties: data.numberOfProperties,
      how_ownership: data.ownershipType,
      // properties_data: data.properties?.map((e: any) => ({
      //   alias: e.alias,
      //   legal_description: e.legalDescription,
      //   comments: e.comments,
      //   state: e.state,
      //   county: e.county,
      //   property_address: e.propertyAddress,
      //   property_city: e.propertyCity,
      //   property_state: e.propertyState,
      //   property_zipcode: e.propertyZipCode,
      //   minerals_data: e.minerals.map((e: any) => e.value),
      // })),
    };

    registerLandOwner(payload).then((res: any) => {
      if (res.status === 400) {
        toast.error('Please check marked fields and correct your entries.');
      } else {
        toast.success('Registration successful.');
        navigate('/login', { replace: true });
      }
    });
  };

  return (
    <div className={classes.container}>
      <Header />

      {!agreed && (
        <VerificationComponent
          isAgree={agreeVerification}
          onCheckboxChange={() => setAgreeVerification(!agreeVerification)}
          onContinue={() => setAgreed(true)}
        />
      )}

      {!!agreed && (
        <BreadcrumbComponent
          items={[
            { id: 1, text: '1' },
            { id: 2, text: '2' },
            { id: 3, text: '3' },
            { id: 4, text: '4' },
          ]}
          activeId={step}
        />
      )}

      {!!agreed && step === 1 && (
        <PersonalOwnerInformationComponent
          onBack={onBackHandler}
          onContinue={onPersonalOwnerInfoContinue}
          inputHandler={inputHandler}
          data={data}
        />
      )}

      {!!agreed && step === 2 && (
        <ContactInformationComponent
          onBack={onBackHandler}
          onContinue={onContactInfoContinue}
          inputHandler={inputHandler}
          data={data}
        />
      )}

      {!!agreed && step === 3 && (
        <LegalInformationComponent
          onBack={onBackHandler}
          onContinue={onLegalInfoContinue}
          inputHandler={inputHandler}
          data={data}
        />
      )}

      {!!agreed && step === 4 && (
        <PropertyMineralInformationComponent
          onBack={onBackHandler}
          onSubmit={onSubmit}
          inputHandler={inputHandler}
          data={data}
        />
      )}

      <div className={classes.footer}>
        <Footer />
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  footer: {
    marginLeft: 80,
    marginRight: 80,
    marginTop: 48,
    borderTop: ['solid', 1, '#d0d5dd'],
  },
});

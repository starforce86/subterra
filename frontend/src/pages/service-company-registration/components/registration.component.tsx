import React, { useEffect, useState } from 'react';
import { createUseStyles } from 'react-jss';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { Button } from '../../../components/button.component';
import { CheckBoxInput } from '../../../components/check-box.component';
import { Dropdown } from '../../../components/dropdown.component';
import { TextInput } from '../../../components/text-input.component';
import { registerServiceCompany } from '../../../services/registration.action';
import {
  getCertificationTypes,
  getCities,
  getCounty,
  getMineralTypes,
  getServicesOffered,
  getState,
} from '../../../services/statics.action';

type CustomProps = {
  onBack: Function;
};

export const RegistrationComponent: React.FC<CustomProps> = ({ onBack }) => {
  const classes = styles();
  const [data, setData] = useState({
    lookForProperties: 'Producing',
    interestedIn: 'Operated',
  } as any);
  const [minerals, setMinerals] = useState([] as any[]);
  const [certifications, setCertifications] = useState([] as any[]);
  const [state, setState] = useState([] as any[]);
  const [county, setCounty] = useState([] as any[]);
  const [cities, setCity] = useState([] as any[]);
  const [services, setServices] = useState([] as any[]);
  const [errors, setErrors] = useState({} as any);
  const [tncAgree, setTncAgree] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const inputHandler = (obj: Record<string, any>) => {
    Object.keys(obj).forEach((e: string) => delete errors[e]);
    setData({ ...data, ...obj });
  };

  const handleImageChange = async (e: any) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.onloadend = () => {
      inputHandler({
        photo: {
          file,
          imagePreviewUrl: reader.result,
        },
      });
    };
    reader.readAsDataURL(file);
  };

  const openFileUpload = () => {
    const input = document.getElementById('file-input');
    input?.click();
  };

  const onSubmit = () => {
    if (!tncAgree) {
      toast.error('Must accept Terms and Condition and Privacy Policy');
      return false;
    }

    const payload = buildPayload();

    if (!payload) return;
    setLoading(true);
    registerServiceCompany(payload)
      .then((res: any) => {
        if (res.status === 400) {
          const errors: any = {};
          Object.keys(res.data).forEach((e: any) => {
            errors[
              e.replace(/([-_])([a-z])/g, (_match: any, _p1: any, p2: any) =>
                p2.toUpperCase(),
              )
            ] = true;
          });
          setErrors(errors);
          toast.error('Please check marked fields and correct your entries.');
        } else {
          toast.success('Registration successful.');
          navigate('/login', { replace: true });
        }
      })
      .finally(() => setLoading(false));
  };

  const buildPayload = () => {
    const errors: any = {};

    if (!data.companyName) errors.companyName = true;
    if (!data.email) errors.email = true;
    if (!data.password1) errors.password1 = true;
    if (!data.password2 || data.password1 !== data.password2)
      errors.password2 = true;
    if (!data.contacts) errors.contacts = true;
    if (!data.address) errors.address = true;
    if (!data.state) errors.state = true;
    if (!data.county) errors.county = true;
    if (!data.city) errors.city = true;
    if (!data.zipCode) errors.zipCode = true;
    if (!data.phone) errors.phone = true;
    if (!data.preferredState) errors.preferredState = true;
    if (!data.lookForProperties) errors.lookForProperties = true;
    if (!data.minerals) errors.minerals = true;
    if (!data.interestedIn) errors.interestedIn = true;
    if (!data.dealValuePreference) errors.dealValuePreference = true;
    if (!data.socialLinks) errors.socialLinks = true;
    if (!data.websiteUrl) errors.websiteUrl = true;
    if (!data.services) errors.services = true;
    if (!data.certification) errors.certification = true;
    if (!data.certificationNumber) errors.certificationNumber = true;
    if (!data.photo) errors.photo = true;

    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      toast.error('Please check marked fields and correct your entries.');
      return;
    }

    return {
      email: data.email,
      password1: data.password1,
      password2: data.password2,
      company_name: data.companyName,
      contacts: data.contacts.split(',').map((e: string) => {
        e = e.trim();
        return {
          first_name: e.split(' ').slice(0, -1).join(' '),
          last_name: e.split(' ').slice(-1).join(' '),
        };
      }),
      address: data.address,
      state: data.state.value,
      county: data.county.value,
      city: data.city.value,
      zipcode: data.zipCode,
      phones: [
        {
          phone: data.phone,
        },
      ],
      preferred_states: [
        {
          state: data.preferredState.value,
        },
      ],
      services: data.services.map((e: any) => e.value),
      look_for_properties: data.lookForProperties,
      look_for_minerals: data.mineral.map((e: any) => e.value),
      look_for_minerals_custom: '',
      interested_in: data.interestedIn,
      deal_value_preference_min: data.dealValuePreference.split(',')[0].trim(),
      deal_value_preference_max: data.dealValuePreference.split(',')[1]?.trim(),
      certifications: [
        {
          certification_type: data.certification.value,
          certification_number: data.certificationNumber,
        },
      ],
      social_links: data.socialLinks.split(',').map((e: any) => ({
        social_link: e.trim(),
      })),
      website_url: data.websiteUrl,
      imageFile: data.photo.file,
      cell_phone: '',
    };
  };

  const getCountyList = async (stateId: string) => {
    const res = await getCounty(stateId);
    return res.data.results.map((e: any) => {
      return {
        value: e.id,
        label: e.name,
      };
    });
  };

  const getCityList = async (countyId: string) => {
    const res = await getCities(countyId);
    return res.data.results.map((e: any) => {
      return {
        value: e.id,
        label: e.name,
      };
    });
  };

  useEffect(() => {
    getMineralTypes().then((res: any) => {
      setMinerals(
        res.data.results.map((e: any) => {
          return {
            value: e.id,
            label: e.title,
          };
        }),
      );
    });
    getCertificationTypes().then((res: any) => {
      setCertifications(
        res.data.results.map((e: any) => {
          return {
            value: e.id,
            label: e.title,
          };
        }),
      );
    });
    getState().then((res: any) => {
      setState(
        res.data.results.map((e: any) => {
          return {
            value: e.id,
            label: e.name,
          };
        }),
      );
    });
    getServicesOffered().then((res: any) => {
      setServices(
        res.data.results.map((e: any) => {
          return {
            value: e.id,
            label: e.service,
          };
        }),
      );
    });
  }, []);

  return (
    <div className={classes.container}>
      <div className={classes.bodyContainer}>
        <span className={`${classes.text} ${classes.header}`}>
          Company Information
        </span>

        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div className={classes.fieldContainer}>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Company Name*
              </span>
              <TextInput
                placeholder="Company name"
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  inputHandler({ companyName: value })
                }
                error={errors.companyName}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Business contacts names
              </span>
              <TextInput
                placeholder="Business contacts names"
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  inputHandler({ contacts: value })
                }
                error={errors.contacts}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Business address*
              </span>
              <TextInput
                placeholder="Business address"
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  inputHandler({ address: value })
                }
                error={errors.address}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                State
              </span>
              <Dropdown
                options={state}
                selectedOption={data.state}
                onChange={(value: any) => {
                  getCountyList(value.value).then((list) => setCounty(list));
                  setCity([]);
                  inputHandler({ state: value, county: null, city: null });
                }}
                placeholder="State"
                error={errors.state}
              />
            </div>
            <div>
              <div style={{ marginTop: 12 }}>
                <span className={`${classes.text} ${classes.fieldLabel}`}>
                  County
                </span>
                <Dropdown
                  options={county}
                  selectedOption={data.county}
                  onChange={(value: any) => {
                    getCityList(value.value).then((list) => setCity(list));
                    inputHandler({ county: value, city: null });
                  }}
                  placeholder="County"
                  error={errors.county}
                />
              </div>
            </div>
            <div></div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                City
              </span>
              <Dropdown
                options={cities}
                selectedOption={data.city}
                onChange={(value: any) => inputHandler({ city: value })}
                placeholder="City"
                error={errors.city}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Zip Code
              </span>
              <TextInput
                placeholder="Zip code"
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  inputHandler({ zipCode: value })
                }
                error={errors.zipCode}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Email*
              </span>
              <TextInput
                placeholder="Email"
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) => inputHandler({ email: value })}
                error={errors.email}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Phone*
              </span>
              <TextInput
                placeholder="Phone"
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) => inputHandler({ phone: value })}
                error={errors.phone}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Which state do you prefer to work in*
              </span>
              <Dropdown
                options={state}
                selectedOption={data.preferredState}
                onChange={(value: any) =>
                  inputHandler({ preferredState: value })
                }
                placeholder="State"
                error={errors.preferredState}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <form>
                <span className={`${classes.text} ${classes.fieldLabel}`}>
                  Password
                </span>
                <TextInput
                  placeholder="Password"
                  inputStyle={classes.passInput}
                  type="password"
                  onTextChange={(value: string) =>
                    inputHandler({ password1: value })
                  }
                  error={errors.password1}
                />
              </form>
            </div>
            <div style={{ marginTop: 12 }}>
              <CheckBoxInput
                checked={tncAgree}
                onChange={() => setTncAgree(!tncAgree)}
                inputStyle={classes.checkbox}
                text="Accept Terms and Conditions and Privacy Policy"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <Button
                text="Submit"
                buttonStyle={classes.button}
                onClick={() => onSubmit()}
                disabled={loading}
              />
              <Button
                type="secondary_color"
                text="Back"
                buttonStyle={classes.button}
                onClick={() => onBack()}
                disabled={loading}
              />
            </div>
          </div>
          <div className={classes.fieldContainer}>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Looking for properties that are*
              </span>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CheckBoxInput
                  checked={data.lookForProperties === 'Producing'}
                  onChange={() =>
                    inputHandler({ lookForProperties: 'Producing' })
                  }
                  inputStyle={classes.checkbox}
                  text="Producing"
                />
                <CheckBoxInput
                  checked={data.lookForProperties === 'Non-Producing'}
                  onChange={() =>
                    inputHandler({ lookForProperties: 'Non-Producing' })
                  }
                  inputStyle={classes.checkbox}
                  text="Non-Producing"
                />
                <CheckBoxInput
                  checked={data.lookForProperties === 'Not sure'}
                  onChange={() =>
                    inputHandler({ lookForProperties: 'Not sure' })
                  }
                  inputStyle={classes.checkbox}
                  text="Not sure"
                />
              </div>
            </div>
            <div style={{ marginTop: 22 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Select minerals you are looking for*
              </span>
              <Dropdown
                options={minerals}
                selectedOption={data.minerals}
                onChange={(value: any) => inputHandler({ minerals: value })}
                placeholder="Mineral Type"
                error={errors.minerals}
                isMulti={true}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Interested in*
              </span>
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <CheckBoxInput
                  checked={data.interestedIn === 'Operated'}
                  onChange={() => inputHandler({ interestedIn: 'Operated' })}
                  inputStyle={classes.checkbox}
                  text="Operated"
                />
                <CheckBoxInput
                  checked={data.interestedIn === 'Non-Operated'}
                  onChange={() =>
                    inputHandler({ interestedIn: 'Non-Operated' })
                  }
                  inputStyle={classes.checkbox}
                  text="Non-Operated"
                />
                <CheckBoxInput
                  checked={data.interestedIn === 'Not sure'}
                  onChange={() => inputHandler({ interestedIn: 'Not sure' })}
                  inputStyle={classes.checkbox}
                  text="Not sure"
                />
              </div>
            </div>
            <div style={{ marginTop: 22 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Deal value preference
              </span>
              <TextInput
                placeholder="Min, Max"
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  inputHandler({ dealValuePreference: value })
                }
                error={errors.dealValuePreference}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Social media links
              </span>
              <TextInput
                placeholder="Social media links"
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  inputHandler({ socialLinks: value })
                }
                error={errors.socialLinks}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Website URL
              </span>
              <TextInput
                placeholder="Website URL "
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  inputHandler({ websiteUrl: value })
                }
                error={errors.websiteUrl}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Services offered*
              </span>
              <Dropdown
                options={services}
                selectedOption={data.services}
                onChange={(value: any) => inputHandler({ services: value })}
                placeholder="Services"
                error={errors.services}
                isMulti={true}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Certifications
              </span>
              <Dropdown
                options={certifications}
                selectedOption={data.certification}
                onChange={(value: any) =>
                  inputHandler({ certification: value })
                }
                placeholder="Certification Type"
                error={errors.certification}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Certification Number
              </span>
              <TextInput
                placeholder="Certification Number"
                inputStyle={classes.fieldInput}
                onTextChange={(value: string) =>
                  inputHandler({ certificationNumber: value })
                }
                error={errors.certificationNumber}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <span className={`${classes.text} ${classes.fieldLabel}`}>
                Photo
                {data.photo?.file?.name && (
                  <span
                    style={{
                      fontSize: 12,
                      marginLeft: 3,
                      textDecoration: 'underline',
                      fontStyle: 'italic',
                    }}
                  >
                    ({data.photo?.file?.name})
                  </span>
                )}
              </span>
              <input
                style={{ display: 'none' }}
                id="file-input"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              <Button
                type="secondary_gray"
                text="Upload Photo"
                iconLeading="upload-cloud-01.svg"
                buttonStyle={classes.uploadButton}
                onClick={() => openFileUpload()}
                destructive={errors.photo}
              />
            </div>
            <div style={{ marginTop: 12 }}>
              <form>
                <span className={`${classes.text} ${classes.fieldLabel}`}>
                  Confirm Password
                </span>
                <TextInput
                  type="password"
                  placeholder="Confirm Password"
                  inputStyle={classes.passInput}
                  onTextChange={(value: string) =>
                    inputHandler({ password2: value })
                  }
                  error={errors.password2}
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  bodyContainer: {
    margin: '0px 80px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    maxWidth: 730,
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    textAlign: 'left',
  },

  header: {
    marginTop: 17,
    fontSize: 30,
    fontWeight: 600,
    color: '#000',
  },

  fieldContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: 410,
    marginRight: 30,
  },

  fieldLabel: {
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: 0,
    color: '#000000',
    lineHeight: 2,
  },

  fieldInput: {
    width: 370,
  },

  passInput: {
    width: 350,
  },

  checkbox: {
    marginTop: 14,
    marginRight: 20,
    color: '#344054',
    minWidth: 'max-content',
  },

  button: {
    height: 41,
    width: 125,
    fontSize: 16,
    marginBottom: 60,
    marginRight: 25,
    marginTop: 20,
  },

  uploadButton: {
    height: 40,
    width: 410,
    fontSize: 16,
  },
});

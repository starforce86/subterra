import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { TextInput } from '../../../components/text-input.component';

export const PrivacyPolicyComponent: React.FC = () => {
  const classes = styles();
  const [data, setData] = useState({
    name: '',
    date: '',
  });

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <span className={classes.header}>
          Privacy Policy of Subterra Data Services website
        </span>
      </div>
      <div className={classes.bodyContainer}>
        <div>
          <span className={`${classes.text} ${classes.subheader}`}>
            Subterra Data Services operates the www.subterradataservices.com
            website, which provides the SERVICE.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            This page is used to inform website visitors regarding our policies
            with the collection, use, and disclosure of Personal Information if
            anyone decided to use our Service, the SubterraDataServices.com
            website.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            If you choose to use our Service, then you agree to the collection
            and use of information in relation with this policy. The Personal
            Information that we collect are used for providing and improving the
            Service. We will not use or share your information with anyone
            except as described in this Privacy Policy. Our Privacy Policy was
            created with the help of the{' '}
            <span style={{ textDecoration: 'underline' }}>
              Privacy Policy Template Generator
            </span>
            .
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            The terms used in this Privacy Policy have the same meanings as in
            our Terms and Conditions, which is accessible at
            www.subterradataservices.com, unless otherwise defined in this
            Privacy Policy.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Information Collection and Use
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            For a better experience while using our Service, we may require you
            to provide us with certain personally identifiable information,
            including but not limited to your name, phone number, and postal
            address. The information that we collect will be used to contact or
            identify you.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Log Data
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Cookies are files with small amount of data that is commonly used an
            anonymous unique identifier. These are sent to your browser from the
            website that you visit and are stored on your computer’s hard drive.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Our website uses these &quot;cookies&quot; to collection information
            and to improve our Service. You have the option to either accept or
            refuse these cookies, and know when a cookie is being sent to your
            computer. If you choose to refuse our cookies, you may not be able
            to use some portions of our Service.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Service Providers
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            We may employ third-party companies and individuals due to the
            following reasons:
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <ul>
            <li className={classes.text}>To facilitate our Service;</li>
            <li className={classes.text}>
              To provide the Service on our behalf;
            </li>
            <li className={classes.text}>
              To perform Service-related services; or
            </li>
            <li className={classes.text}>
              To assist us in analyzing how our Service is used.
            </li>
          </ul>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            We want to inform our Service users that these third parties have
            access to your Personal Information. The reason is to perform the
            tasks assigned to them on our behalf. However, they are obligated
            not to disclose or use the information for any other purpose.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Security
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            We value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and we
            cannot guarantee its absolute security.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Links to Other Sites
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Our Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by us. Therefore, we strongly advise
            you to review the Privacy Policy of these websites. We have no
            control over, and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Children&rsquo;s Privacy
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Our Services do not address anyone under the age of 13. We do not
            knowingly collect personal identifiable information from children
            under 13. In the case we discover that a child under 13 has provided
            us with personal information, we immediately delete this from our
            servers. If you are a parent or guardian and you are aware that your
            child has provided us with personal information, please contact us
            so that we will be able to do necessary actions.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Changes to This Privacy Policy
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            We may update our Privacy Policy from time to time. Thus, we advise
            you to review this page periodically for any changes. We will notify
            you of any changes by posting the new Privacy Policy on this page.
            These changes are effective immediately, after they are posted on
            this page.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Contact Us
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            If you have any questions or suggestions about our Privacy Policy,
            do not hesitate to contact us.
          </span>
        </div>

        <div style={{ marginTop: 44 }}>
          <span className={classes.text}>
            <span
              style={{
                textDecoration: 'underline',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => {}}
            >
              Data Collection.&nbsp;
            </span>
            You acknowledge that in addition to your Profile Information
            Subterra Data Services automatically collects various pieces of
            information and data (including but not limited to Your geolocation
            from time to time and information in respect of submission of any
            Content via SDS website) from Your mobile device and/or web browser
            (as the case may be). You agree to the collection of any data or
            other such information from your mobile device and/or web browser
            and the transmission of the same to Subterra Data Services and/or
            any other susidiary of Subterra Data Services, for any use
            whatsoever (including but not limited to disclosure to any third
            party and for purposes of commercialization as part of a
            de-identified data set for the purposes of analysis).
          </span>
        </div>

        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            <span
              style={{
                textDecoration: 'underline',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => {}}
            >
              Data Usage.&nbsp;
            </span>
            You retain ownership of all personal data uploaded via the
            subterradataservices.com website and stored in the cloud and are
            responsible for the content and accuracy of details you provide to
            Subterra Data Services as well as for the non-violation of any
            third-party rights that may be included in such data. By using the
            Service, you grant Subterra Data Services a worldwide, royalty-free,
            non-exclusive license to use, distribute, reproduce, modify, adapt,
            publish, translate, create, access, and retain such data, including
            usage data, for the purpose of providing you with the Service. You
            agree that Subterra Data Services may collect and use technical data
            and related information, including, but not limited to, unique
            device identifiers and other technical information about your
            device, system and application software, and peripherals that is
            gathered periodically to facilitate the provision of software
            updates, product support, and other services to you (if any) related
            to the website / mobile app, and to track and report your activity
            inside of the website / mobile app, including for analytics
            purposes. In particular, Subterra Data Services is entitled to use
            the contents of such data or any messages, for any purpose, such as
            the development, production and/or marketing of products or services
            and to reproduce such information and make it available to third
            parties without any limitations or to the greatest extent permitted
            by applicable law. The user gives his or her consent for Subterra
            Data Services to store such details and to use the same for the
            purposes set out in this Data Usage provision. Please see the
            Privacy Policy for more details regarding the information Ascensia
            collects and how it uses and discloses that information.
          </span>
        </div>

        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            <span
              style={{
                textDecoration: 'underline',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => {}}
            >
              Data Security.&nbsp;
            </span>
            (A) The Company(Subterra Data Services or “SDS”) and its
            subsidiaries have materially complied and are presently in material
            compliance with all internal policies implemented by the Company or
            any public-facing policies authored by the Company, all contractual
            obligations binding on the Company or any of its subsidiaries, and
            all laws, statutes and regulations, and to the Company’s knowledge,
            judgments, orders or rules of any court or arbitrator or other
            governmental or regulatory authority binding the Company or any of
            its subsidiaries, in each case, relating to the collection, use,
            transfer, import, export, storage, protection, disposal and
            disclosure by the Company or any of its subsidiaries of personal,
            personally identifiable household, or regulated data (“Data Security
            Obligations”, and such data, “Data”); (B) the Company has not
            received any written notification or complaint regarding, and is
            unaware of any other facts that, individually or in the aggregate,
            would reasonably indicate material non-compliance with, any Data
            Security Obligation; (C) there is no action, suit or proceeding by
            or before any court or governmental agency, authority or body
            pending or threatened alleging non-compliance by the Company with
            any Data Security Obligation; (D) the Company and each of its
            subsidiaries have taken commercially reasonable technical and
            organizational measures necessary to protect the information
            technology systems owned or controlled by the Company or any of its
            subsidiaries (including any Data processed thereon or otherwise
            processed by the Company) and used in connection with the operation
            of the Company’s and its subsidiaries’ businesses; (E) without
            limiting the foregoing, the Company and its subsidiaries have used
            reasonable efforts to establish and maintain, and have established
            and maintained reasonable information technology, information
            security, cyber security and data protection controls, policies and
            procedures, designed to protect against and prevent a breach,
            destruction, loss, unauthorized distribution, use, access,
            disablement, misappropriation or modification, or other compromise
            or misuse of any information technology system or Data used in
            connection with the operation of the Company’s and its subsidiaries’
            businesses (“Breach”); and (F) to the Company’s knowledge, there has
            been no such material Breach, and the Company and its subsidiaries
            have not been notified of, and have no knowledge of any event or
            condition that would reasonably be expected to result in,
          </span>
        </div>

        <div style={{ marginTop: 69, display: 'flex', flexDirection: 'row' }}>
          <div style={{ marginRight: 22 }}>
            <TextInput
              placeholder="Enter Signature"
              value={data.name}
              inputStyle={classes.inputSign}
              onTextChange={(value: any) => setData({ ...data, name: value })}
            />
          </div>
          <TextInput
            placeholder="Enter date"
            value={data.date}
            inputStyle={classes.inputDate}
            onTextChange={(value: any) => setData({ ...data, date: value })}
          />
        </div>
        <div style={{ marginTop: 30 }}>
          <Button
            text="Submit"
            buttonStyle={classes.button}
            onClick={() => {}}
          />
        </div>
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    margin: 30,
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
  },

  text: {
    fontFamily: 'Inter',
    fontStyle: 'normal',
    textAlign: 'left',
    color: '#000',
    fontSize: 18,
    lineHeight: 1.5,
  },

  headerContainer: {
    maxWidth: '100%',
  },

  header: {
    fontSize: 30,
    fontWeight: '600',
    color: '#101828',
  },

  bodyContainer: {
    marginTop: 24,
    maxWidth: 900,
  },

  subheader: {
    fontSize: 20,
    marginRight: 20,
    fontWeight: 600,
  },

  button: {
    height: 44,
    width: 155,
  },

  inputSign: {
    width: 363,
  },

  inputDate: {
    width: 207,
  },
});

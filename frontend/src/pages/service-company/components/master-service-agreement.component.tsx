import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Button } from '../../../components/button.component';
import { TextInput } from '../../../components/text-input.component';

type CustomProps = {
  onPrivacyPolicy: Function;
};
export const MasterServiceAgreementComponent: React.FC<CustomProps> = ({
  onPrivacyPolicy,
}) => {
  const classes = styles();
  const [data, setData] = useState({
    name: '',
    date: '',
  });

  return (
    <div className={classes.container}>
      <div className={classes.headerContainer}>
        <span className={classes.header}>
          Terms and Conditions for use of Subterra Data Services website.
        </span>
      </div>
      <div className={classes.bodyContainer}>
        <div>
          <span className={`${classes.text} ${classes.subheader}`}>
            Welcome to subterradataservices.com!
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            These terms and conditions outline the rules and regulations for the
            use of Subterra Data Services&rsquo;s Website, located at
            www.subterradataservices.com.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            By accessing this website we assume you accept these terms and
            conditions. Do not continue to use subterradataservices.com if you
            do not agree to take all of the terms and conditions stated on this
            page.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            The following terminology applies to these Terms and Conditions,
            Privacy Statement and Disclaimer Notice and all Agreements:
            &quot;Client&quot;, &quot;You&quot; and &quot;Your&quot; refers to
            you, the person log on this website and compliant to the
            Company&rsquo;s terms and conditions. &quot;The Company&quot;,
            &quot;Ourselves&quot;, &quot;We&quot;, &quot;Our&quot; and
            &quot;Us&quot;, refers to our Company. &quot;Party&quot;,
            &quot;Parties&quot;, or &quot;Us&quot;, refers to both the Client
            and ourselves. All terms refer to the offer, acceptance and
            consideration of payment necessary to undertake the process of our
            assistance to the Client in the most appropriate manner for the
            express purpose of meeting the Client&rsquo;s needs in respect of
            provision of the Company&rsquo;s stated services, in accordance with
            and subject to, prevailing law of Netherlands. Any use of the above
            terminology or other words in the singular, plural, capitalization
            and/or he/she or they, are taken as interchangeable and therefore as
            referring to same.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Cookies
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            We employ the use of cookies. By accessing subterradataservices.com,
            you agreed to use cookies in agreement with the Subterra Data
            Services&rsquo;s Privacy Policy.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Most interactive websites use cookies to let us retrieve the
            user&rsquo;s details for each visit. Cookies are used by our website
            to enable the functionality of certain areas to make it easier for
            people visiting our website. Some of our affiliate/advertising
            partners may also use cookies.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            License
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Unless otherwise stated, Subterra Data Services and/or its licensors
            own the intellectual property rights for all material on
            subterradataservices.com. All intellectual property rights are
            reserved. You may access this from subterradataservices.com for your
            own personal use subjected to restrictions set in these terms and
            conditions.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>You must not:</span>
        </div>
        <div style={{ marginTop: 12 }}>
          <ul>
            <li className={classes.text}>
              Republish material from subterradataservices.com
            </li>
            <li className={classes.text}>
              Sell, rent or sub-license material from subterradataservices.com
            </li>
            <li className={classes.text}>
              Reproduce, duplicate or copy material from
              subterradataservices.com
            </li>
            <li className={classes.text}>
              Redistribute content from subterradataservices.com
            </li>
          </ul>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            This Agreement shall begin on the date hereof. Our Terms and
            Conditions were created with the help of the&nbsp;
            <span
              className={classes.text}
              style={{ textDecoration: 'underline' }}
            >
              Free Terms and Conditions Generator
            </span>
            .
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Parts of this website offer an opportunity for users to post and
            exchange opinions and information in certain areas of the website.
            Subterra Data Services does not filter, edit, publish or review
            Comments prior to their presence on the website. Comments do not
            reflect the views and opinions of Subterra Data Services,its agents
            and/or affiliates. Comments reflect the views and opinions of the
            person who post their views and opinions. To the extent permitted by
            applicable laws, Subterra Data Services shall not be liable for the
            Comments or for any liability, damages or expenses caused and/or
            suffered as a result of any use of and/or posting of and/or
            appearance of the Comments on this website.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Subterra Data Services reserves the right to monitor all Comments
            and to remove any Comments which can be considered inappropriate,
            offensive or causes breach of these Terms and Conditions.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>You warrant and represent that:</span>
        </div>
        <div style={{ marginTop: 12 }}>
          <ul>
            <li className={classes.text}>
              You are entitled to post the Comments on our website and have all
              necessary licenses and consents to do so;
            </li>
            <li className={classes.text}>
              The Comments do not invade any intellectual property right,
              including without limitation copyright, patent or trademark of any
              third party;
            </li>
            <li className={classes.text}>
              The Comments do not contain any defamatory, libelous, offensive,
              indecent or otherwise unlawful material which is an invasion of
              privacy
            </li>
            <li className={classes.text}>
              The Comments will not be used to solicit or promote business or
              custom or present commercial activities or unlawful activity.
            </li>
          </ul>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            You hereby grant Subterra Data Services a non-exclusive license to
            use, reproduce, edit and authorize others to use, reproduce and edit
            any of your Comments in any and all forms, formats or media.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Hyperlinking to our Content
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            The following organizations may link to our Website without prior
            written approval:
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <ul>
            <li className={classes.text}>Government agencies;</li>
            <li className={classes.text}>Search engines;</li>
            <li className={classes.text}>News organizations;</li>
            <li className={classes.text}>
              Online directory distributors may link to our Website in the same
              manner as they hyperlink to the Websites of other listed
              businesses; and
            </li>
            <li className={classes.text}>
              System wide Accredited Businesses except soliciting non-profit
              organizations, charity shopping malls, and charity fundraising
              groups which may not hyperlink to our Web site.
            </li>
          </ul>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            These organizations may link to our home page, to publications or to
            other Website information so long as the link: (a) is not in any way
            deceptive; (b) does not falsely imply sponsorship, endorsement or
            approval of the linking party and its products and/or services; and
            (c) fits within the context of the linking party’s site.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            We may consider and approve other link requests from the following
            types of organizations:
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <ul>
            <li className={classes.text}>
              commonly-known consumer and/or business information sources;
            </li>
            <li className={classes.text}>dot.com community sites;</li>
            <li className={classes.text}>
              associations or other groups representing charities;
            </li>
            <li className={classes.text}>online directory distributors;</li>
            <li className={classes.text}>internet portals;</li>
            <li className={classes.text}>
              accounting, law and consulting firms; and
            </li>
            <li className={classes.text}>
              educational institutions and trade associations.
            </li>
          </ul>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            We will approve link requests from these organizations if we decide
            that: (a) the link would not make us look unfavorably to ourselves
            or to our accredited businesses; (b) the organization does not have
            any negative records with us; (c) the benefit to us from the
            visibility of the hyperlink compensates the absence of Subterra Data
            Services; and (d) the link is in the context of general resource
            information.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            These organizations may link to our home page so long as the link:
            (a) is not in any way deceptive; (b) does not falsely imply
            sponsorship, endorsement or approval of the linking party and its
            products or services; and (c) fits within the context of the linking
            party’s site.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            If you are one of the organizations listed in paragraph 2 above and
            are interested in linking to our website, you must inform us by
            sending an e-mail to Subterra Data Services. Please include your
            name, your organization name, contact information as well as the URL
            of your site, a list of any URLs from which you intend to link to
            our Website, and a list of the URLs on our site to which you would
            like to link. Wait 2-3 weeks for a response.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Approved organizations may hyperlink to our Website as follows:
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <ul>
            <li className={classes.text}>By use of our corporate name; or</li>
            <li className={classes.text}>
              By use of the uniform resource locator being linked to; or
            </li>
            <li className={classes.text}>
              By use of any other description of our Website being linked to
              that makes sense within the context and format of content on the
              linking party’s site.
            </li>
          </ul>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            No use of Subterra Data Services&rsquo;s logo or other artwork will
            be allowed for linking absent a trademark license agreement.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            iFrames
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Without prior approval and written permission, you may not create
            frames around our Webpages that alter in any way the visual
            presentation or appearance of our Website.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Content Liability
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            We shall not be hold responsible for any content that appears on
            your Website. You agree to protect and defend us against all claims
            that is rising on your Website. No link(s) should appear on any
            Website that may be interpreted as libelous, obscene or criminal, or
            which infringes, otherwise violates, or advocates the infringement
            or other violation of, any third party rights.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Your Privacy
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            Please read{' '}
            <span
              style={{
                textDecoration: 'underline',
                fontWeight: 'bold',
                cursor: 'pointer',
              }}
              onClick={() => {
                onPrivacyPolicy();
                window.scrollTo(0, 0);
              }}
            >
              Privacy Policy
            </span>
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Reservation of Rights
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            We reserve the right to request that you remove all links or any
            particular link to our Website. You approve to immediately remove
            all links to our Website upon request. We also reserve the right to
            amen these terms and conditions and it’s linking policy at any time.
            By continuously linking to our Website, you agree to be bound to and
            follow these linking terms and conditions.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Removal of links from our website
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            If you find any link on our Website that is offensive for any
            reason, you are free to contact and inform us any moment. We will
            consider requests to remove links but we are not obligated to or so
            or to respond to you directly.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            We do not ensure that the information on this website is correct, we
            do not warrant its completeness or accuracy; nor do we promise to
            ensure that the website remains available or that the material on
            the website is kept up to date.
          </span>
        </div>

        <div style={{ marginTop: 30 }}>
          <span className={`${classes.text} ${classes.subheader}`}>
            Disclaimer
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            To the maximum extent permitted by applicable law, we exclude all
            representations, warranties and conditions relating to our website
            and the use of this website. Nothing in this disclaimer will:
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <ul>
            <li className={classes.text}>
              limit or exclude our or your liability for death or personal
              injury;
            </li>
            <li className={classes.text}>
              limit or exclude our or your liability for fraud or fraudulent
              misrepresentation;
            </li>
            <li className={classes.text}>
              limit any of our or your liabilities in any way that is not
              permitted under applicable law; or
            </li>
            <li className={classes.text}>
              exclude any of our or your liabilities that may not be excluded
              under applicable law.
            </li>
          </ul>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            The limitations and prohibitions of liability set in this Section
            and elsewhere in this disclaimer: (a) are subject to the preceding
            paragraph; and (b) govern all liabilities arising under the
            disclaimer, including liabilities arising in contract, in tort and
            for breach of statutory duty.
          </span>
        </div>
        <div style={{ marginTop: 12 }}>
          <span className={classes.text}>
            As long as the website and the information and services on the
            website are provided free of charge, we will not be liable for any
            loss or damage of any nature.
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
    maxWidth: 450,
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

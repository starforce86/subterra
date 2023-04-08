import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Footer } from '../../components/footer.component';
import { Header } from '../../components/header.component';
import { SidebarComponent } from '../../components/sidebar.component';
import { InquiriesComponent } from './components/inquiries.component';
import { MasterServiceAgreementComponent } from './components/master-service-agreement.component';
import { PrivacyPolicyComponent } from './components/privacy-policy.component';
import { ProfileComponent } from './components/profile.component';
import { SearchComponent } from './components/search.component';

interface CustomProps {
  navigation?: any;
}

export const ServiceCompanyPage: React.FC<CustomProps> = ({ navigation }) => {
  const [activePage, setActivePage] = useState('profile');
  const classes = styles();

  const navItems = [
    {
      icon: 'building-07.svg',
      text: 'Company Profile',
      onClick: () => setActivePage('profile'),
      active: activePage === 'profile',
    },
    {
      icon: 'message-question-square.svg',
      text: 'Inquiries',
      onClick: () => setActivePage('inquiries'),
      active: activePage === 'inquiries',
    },
    {
      icon: 'search-sm.svg',
      text: 'Search Properties',
      onClick: () => setActivePage('search'),
      active: activePage === 'search',
    },
    {
      icon: 'certificate-02.svg',
      text: 'Master Service Agreement',
      onClick: () => setActivePage('master_agreement'),
      active: activePage === 'master_agreement',
    },
    {
      icon: 'shield-02.svg',
      text: 'Privacy Policy',
      onClick: () => setActivePage('privacy_policy'),
      active: activePage === 'privacy_policy',
    },
  ];

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.bodyContainer}>
        <div style={{ height: '100%' }}>
          <SidebarComponent items={navItems} />
        </div>
        <div className={classes.divider}></div>
        {activePage === 'profile' && <ProfileComponent />}
        {activePage === 'inquiries' && <InquiriesComponent />}
        {activePage === 'search' && <SearchComponent />}
        {activePage === 'master_agreement' && (
          <MasterServiceAgreementComponent
            onPrivacyPolicy={() => setActivePage('privacy_policy')}
          />
        )}
        {activePage === 'privacy_policy' && <PrivacyPolicyComponent />}
      </div>
      <div style={{ marginLeft: 80, marginRight: 80 }}>
        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

const styles = createUseStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
  },

  bodyContainer: {
    display: 'flex',
    flexDirection: 'row',
  },

  footer: {
    borderTop: ['solid', 1, '#d0d5dd'],
  },

  divider: {
    minHeight: '80vh',
    borderLeft: ['solid', 1, '#d0d5dd'],
  },
});

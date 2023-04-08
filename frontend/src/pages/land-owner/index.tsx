import React, { useState } from 'react';
import { createUseStyles } from 'react-jss';
import { Footer } from '../../components/footer.component';
import { Header } from '../../components/header.component';
import { SidebarComponent } from '../../components/sidebar.component';
import { HeirListComponent } from './components/heir-list.component';
import { InquiriesComponent } from './components/inquiries.component';
import { LegalQuestionComponent } from './components/legal-question.component';
import { ManageMyRightComponent } from './components/manage-my-right.component';
import { ProfileComponent } from './components/profile.component';
import { PropertyListComponent } from './components/property-list.component';

interface CustomProps {
  navigation?: any;
}

export const LandOwnerPage: React.FC<CustomProps> = ({ navigation }) => {
  const [activePage, setActivePage] = useState('profile');
  const classes = styles();

  const navItems = [
    {
      icon: 'user-01.svg',
      text: 'Profile',
      onClick: () => setActivePage('profile'),
      active: activePage === 'profile',
    },
    {
      icon: 'building-06.svg',
      text: 'Properties',
      onClick: () => setActivePage('properties'),
      active: activePage === 'properties',
    },
    {
      icon: 'coins-hand.svg',
      text: 'Heirs',
      onClick: () => setActivePage('heirs'),
      active: activePage === 'heirs',
    },
    {
      icon: 'briefcase-01.svg',
      text: 'Legal Questions',
      onClick: () => setActivePage('legal_questions'),
      active: activePage === 'legal_questions',
    },
    {
      icon: 'file-check-02.svg',
      text: 'Manage My Rights',
      onClick: () => setActivePage('manage_my_rights'),
      active: activePage === 'manage_my_rights',
    },
    {
      icon: 'message-question-square.svg',
      text: 'Inquiries',
      onClick: () => setActivePage('inquiries'),
      active: activePage === 'inquiries',
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
        {activePage === 'properties' && (
          <PropertyListComponent isActive={activePage === 'properties'} />
        )}
        {activePage === 'heirs' && (
          <HeirListComponent isActive={activePage === 'heirs'} />
        )}
        {activePage === 'manage_my_rights' && <ManageMyRightComponent />}
        {activePage === 'inquiries' && <InquiriesComponent />}
        {activePage === 'legal_questions' && <LegalQuestionComponent />}
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

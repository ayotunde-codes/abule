import Head from 'next/head';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import router, { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { Fn } from '@abule-common/components';
import ArrowDown from '../../../../components/admin/icons/arrow_down-ico';
import UserIcon from '../../../../components/admin/icons/user-ico';
import ListPageHeader from '../../../../components/admin/lists/ListPageHeader/header';
import Layout from '../../../../components/admin/layout';

const {
  isEmail, isEmpty, popMessage, popAlert,
} = Fn;

const EditAdmin = ({
  processFiles, showDepartments, setShowDepartments, showRoles, setShowRoles,
}) => {
  const [formState, setFormState] = useState({
    firstName: '',
    lastName: '',
    email: '',
    department: '',
    role: '',
    photoAssemblyId: '',
  });

  const [departments, setDepartments] = useState([]);
  const [roles, setRoles] = useState([]);
  const fileInput = useRef(null);
  const [imageLink, setImageLink] = useState('');
  const [dropDownLabels, setDropDownLabels] = useState({
    department: '',
    role: '',
  });

  const leadRoles = [
    'SUPER_ADMIN',
    'HR_Lead',
    'Product_Lead',
    'Marketing_Lead',
    'Development_Lead',
    'Customer Success_Lead',
    'Analyst_Lead',
  ];

  const router = useRouter();

  const admin = useSelector((state) => state.admin);

  useEffect(() => {
    if (!leadRoles.includes(admin.data?.adminRole?.name)) router.push('/admin/users');
  }, [admin.hasAccess]);

  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const { data } = await axios.get(`${process.env.REACT_APP_API}/admin/departments`);
        if (data) {
          if (admin?.data?.adminRole?.name === 'SUPER_ADMIN') {
            setDepartments(data.data.departments);
            setRoles(data.data.departments[0].roles);
            setFormState({
              ...formState,
              department: departments[0]?.id,
              role: departments[0].roles[0]?.id,
            });
          } else {
            const department = data.data.departments.filter((dept) => dept.label === admin?.data?.adminDepartment.label);
            setDepartments(department);
            setRoles(department[0]?.roles);
            setFormState({
              ...formState,
              department: department[0]?.id,
              role: department[0].roles[0]?.id,
            });
          }
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchDepartments();
  }, []);

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        const config = {
          headers: { Authorization: `Bearer ${admin?.data?.token}` },
        };
        let route = '';
        if (admin?.data?.adminDepartment?.name === 'Management' || admin?.data?.adminDepartment?.name === 'Human_Resources') {
          route = `${process.env.REACT_APP_API}/admin/admins/${router.query?.id}`;
        } else {
          route = `${process.env.REACT_APP_API}/admin/admins/${router.query?.id}/department`;
        }
        const { status, data } = await axios.get(route, config);
        if (status === 200) {
          const {
            firstName, lastName, email, department, imageUrl, accountStatus, adminDepartment, adminRole,
          } = data?.data?.admin;
          if (accountStatus === 'Pending') {
            popMessage(
              `<div>
                                <img src='/icons/error-ico.svg' alt='icon'>
                                <span>Error</span> 
                                <div>Invite pending</div>
                            </div>`,
              'adminApp_message',
            );
            setTimeout(() => router.push('/admin/manage'), 5000);
          } else {
            setFormState({
              firstName,
              lastName,
              email,
              department,
              photoAssemblyId: imageUrl === null ? '' : imageUrl,
            });
            console.log('This is the department----', department);
            setDropDownLabels({
              department: adminDepartment?.label,
            });
          }
        }
      } catch (e) {
        popMessage(
          `<div>
                        <img src='/icons/error-ico.svg' alt='icon'>
                        <span>Error</span> 
                        <div>Could not fetch admin</div>
                    </div>`,
          'adminApp_message',
        );
        setTimeout(() => router.push('/admin/manage'), 5000);
      }
    };
    fetchAdminData();
  }, []);

  useEffect(() => {
    const populateRoles = () => {
      const newDepartment = departments?.filter(({ id }) => id === formState.department);
      if (newDepartment?.length > 0) {
        setRoles(newDepartment[0].roles);
        setFormState({
          ...formState,
          role: newDepartment[0].roles[0].id,
        });
        setDropDownLabels({
          department: newDepartment[0]?.label,
          role: newDepartment[0]?.roles[0]?.label,
        });
      }
    };
    populateRoles();
  }, [formState.department]);

  useEffect(() => {
    if (admin.data?.adminRole?.name !== 'SUPER_ADMIN') router.push('/admin/manage');
  }, [admin.hasAccess]);

  const handleChange = (e) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value.trim(),
    });
  };

  const handleDepartmentChange = (department, label) => {
    setFormState({
      ...formState,
      department,
    });
    setDropDownLabels({
      ...dropDownLabels,
      department: label,
    });
  };

  const handleRoleChange = (role, label) => {
    setFormState({
      ...formState,
      role,
    });
    setDropDownLabels({
      ...dropDownLabels,
      role: label,
    });
  };

  const handleFileChange = async (e) => {
    let mediaAssemblyId = null;
    try {
      const [value] = e.target.files;
      if (value) {
        console.log(value);
        setImageLink(URL.createObjectURL(value));
        const { assemblyId, assembly } = await processFiles('profile-image', [value]);
        mediaAssemblyId = assemblyId;
        console.log('This is the media id---------', mediaAssemblyId);
        setFormState({
          ...formState,
          photoAssemblyId: mediaAssemblyId === undefined ? '' : mediaAssemblyId,
        });
      }
    } catch (e) {
      setImageLink('');
      console.log('Upload failed-----', e);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEmail(formState.email) && !isEmpty(formState.firstName) && !isEmpty(formState.lastName)) {
        const config = {
          headers: { Authorization: `Bearer ${admin?.data?.token}` },
        };
        let route = '';
        if (admin?.data?.adminDepartment?.name === 'Management' || admin?.data?.adminDepartment?.name === 'Human_Resources') {
          route = `${process.env.REACT_APP_API}/admin/admins/${router.query?.id}`;
        } else {
          route = `${process.env.REACT_APP_API}/admin/admins/${router.query?.id}/department`;
        }
        const res = await axios.put(
          route,
          {
            ...formState,
            firstName: formState.firstName.trim(),
            lastName: formState.lastName.trim(),
            email: formState.email.trim(),
          },
          config,
        );

        if (res.status === 200) {
          popMessage(
            `<div>
                            <img src='/icons/success-ico.svg' alt='icon'>
                            <span>Success</span> 
                            <div>Update successful</div>
                        </div>`,
            'adminApp_message',
          );
          setTimeout(() => router.push('/admin/manage'), 5000);
        }
        return;
      }
    } catch (e) {
      console.log(e);
      if (error.response.status === 401) {
        return popMessage(
          `<div>
                        <img src='/icons/error-ico.svg' alt='icon'>
                        <span>Error</span> 
                        <div>Unauthorized</div>
                    </div>`,
          'adminApp_message',
        );
      }
      return popMessage(
        `<div>
                        <img src='/icons/error-ico.svg' alt='icon'>
                        <span>Error</span> 
                        <div>Update failed</div>
                    </div>`,
        'adminApp_message',
      );
    }
  };

  return (
    <form id="root" onSubmit={handleSubmit} className="adminApp_formContainer">
      <div onClick={() => fileInput.current.click()} className="adminApp_formHeader">
        {imageLink === '' ? <UserIcon className="black-fill" /> : <img src={imageLink} alt="Profile Image" />}
      </div>
      <div className="adminApp_inputContainer">
        <input
          className="adminApp_input"
          id="file"
          type="file"
          name="file"
          onChange={handleFileChange}
          ref={fileInput}
          hidden
        />
      </div>
      <div className="adminApp_nameContainer">
        <div className="adminApp_inputContainer">
          <label className="adminApp_label" htmlFor="firstName">
            First name
          </label>
          <input
            className="adminApp_input"
            id="firstName"
            name="firstName"
            type="text"
            onChange={handleChange}
            value={formState.firstName}
            placeholder="First Name"
            required
          />
        </div>
        <div className="adminApp_inputContainer">
          <label className="adminApp_label" htmlFor="lastName">
            Last name
          </label>
          <input
            className="adminApp_input"
            id="lastName"
            name="lastName"
            type="text"
            onChange={handleChange}
            value={formState.lastName}
            placeholder="Last Name"
            required
          />
        </div>
      </div>
      <div className="adminApp_inputContainer">
        <label className="adminApp_label" htmlFor="email">
          Email
        </label>
        <input
          className="adminApp_input"
          id="email"
          type="email"
          placeholder="Email Address"
          name="email"
          value={formState.email}
          onChange={handleChange}
          required
        />
      </div>
      <div className="adminApp_dropdownContainer">
        <span className="adminApp_label">
          Department
        </span>
        <div onClick={() => setShowDepartments(!showDepartments)} className="adminApp_dropdownToggler">
          <span>{dropDownLabels.department}</span>
          <div className="adminApp_arrowDown">
            <ArrowDown />
          </div>
        </div>
        {
          showDepartments && departments?.length > 0 && (
            <div
              className="adminApp_dropDown"
            >
              {
                departments?.map(({ id, label }) => (
                  <div key={id} onClick={() => handleDepartmentChange(id, label)} className="adminApp_dropDownItem">{label}</div>
                ))
              }
            </div>
          )
        }
      </div>
      <div className="adminApp_dropdownContainer">
        <span className="adminApp_label">
          Role
        </span>
        <div onClick={() => setShowRoles(!showRoles)} className="adminApp_dropdownToggler">
          <span>{dropDownLabels.role}</span>
          <div className="adminApp_arrowDown">
            <ArrowDown />
          </div>
        </div>
        {
          showRoles && roles?.length > 0 && (
            <div
              className="adminApp_dropDown"
            >
              {
                roles?.map(({ id, label }) => (
                  <div key={id} onClick={() => handleRoleChange(id, label)} className="adminApp_dropDownItem">{label}</div>
                ))
              }
            </div>
          )
        }
      </div>
      <div className="adminApp_actionsContainer">
        <button type="submit" className="adminApp_formButton">SAVE</button>
        <Link href="/admin/manage">
          <a className="adminApp_formButton_cancel">CANCEL</a>
        </Link>
      </div>
    </form>
  );
};

const Page = ({ setActivePage, processFiles }) => {
  const admin = useSelector((state) => state.admin);
  const [showDepartments, setShowDepartments] = useState(false);
  const [showRoles, setShowRoles] = useState(false);

  const closeDropDowns = () => {
    if (showRoles || showDepartments) {
      setShowDepartments(false);
      setShowRoles(false);
    }
  };

  useEffect(() => {
    setActivePage('manage');
    // if(admin.data?.adminRole?.name !== 'SUPER_ADMIN') router.push('/admin/users')
  }, [admin.hasAccess]);

  return (
    <>
      <Head>
        <title>Abule - Administrators</title>
      </Head>
      <div id="root" onClick={closeDropDowns} className="adminApp_listPage_container">
        <ListPageHeader
          title="Edit Admin"
          firstName={admin?.data?.firstName}
          lastName={admin?.data?.lastName}
          role={admin?.data?.adminRole?.name}
        />
        <EditAdmin
          processFiles={processFiles}
          showDepartments={showDepartments}
          setShowDepartments={setShowDepartments}
          showRoles={showRoles}
          setShowRoles={setShowRoles}
        />
      </div>
    </>
  );
};

const ManageAdmin = ({ processFiles }) => (
  <Layout>
    <Page processFiles={processFiles} />
  </Layout>
);

export default ManageAdmin;

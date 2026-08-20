// Authentication and User Validation Service

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;

// Initial registered users store in localStorage or fallback
const STORAGE_KEY = 'medisphere_registered_users';

const INITIAL_REGISTERED_USERS = [
  // Doctors
  {
    email: 'ramesh.gupta@medisphere.org',
    password: 'Passkey@2026',
    role: 'Doctor',
    name: 'Dr. Ramesh Gupta',
    specialty: 'Cardiologist',
    id: 'doc-1'
  },
  {
    email: 'ananya.sharma@medisphere.org',
    password: 'Passkey@2026',
    role: 'Doctor',
    name: 'Dr. Ananya Sharma',
    specialty: 'Endocrinologist',
    id: 'doc-2'
  },
  {
    email: 'vikram.rao@medisphere.org',
    password: 'Passkey@2026',
    role: 'Doctor',
    name: 'Dr. Vikramaditya Rao',
    specialty: 'Pulmonologist',
    id: 'doc-3'
  },
  {
    email: 'priya.nair@medisphere.org',
    password: 'Passkey@2026',
    role: 'Doctor',
    name: 'Dr. Priya Nair',
    specialty: 'General Physician',
    id: 'doc-4'
  },
  // Patients
  {
    email: 'saurabh@medisphere.org',
    password: 'Passkey@2026',
    role: 'Patient',
    name: 'Saurabh Kumar',
    id: 'saurabh',
    patient: {
      id: 'saurabh',
      name: 'Saurabh Kumar',
      age: 25,
      gender: 'Male',
      contact: '+91 98765 12345',
      assignedDoctor: 'Dr. Ramesh Gupta',
      condition: 'Hypertension & T2 Diabetes',
      email: 'saurabh@medisphere.org'
    }
  },
  {
    email: 'amit@medisphere.org',
    password: 'Passkey@2026',
    role: 'Patient',
    name: 'Amit Sharma',
    id: 'amit',
    patient: {
      id: 'amit',
      name: 'Amit Sharma',
      age: 41,
      gender: 'Male',
      contact: '+91 98765 43210',
      assignedDoctor: 'Dr. Vikramaditya Rao',
      condition: 'Asthma',
      email: 'amit@medisphere.org'
    }
  },
  {
    email: 'priya@medisphere.org',
    password: 'Passkey@2026',
    role: 'Patient',
    name: 'Priya Verma',
    id: 'priya',
    patient: {
      id: 'priya',
      name: 'Priya Verma',
      age: 34,
      gender: 'Female',
      contact: '+91 98111 22233',
      assignedDoctor: 'Dr. Ananya Sharma',
      condition: 'Gestational Diabetes',
      email: 'priya@medisphere.org'
    }
  },
  // Admin
  {
    email: 'admin@medisphere.org',
    password: 'Passkey@2026',
    role: 'Admin',
    name: 'System Administrator',
    id: 'admin-1'
  }
];

function getRegisteredUsers() {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_REGISTERED_USERS));
      return INITIAL_REGISTERED_USERS;
    }
    return JSON.parse(data);
  } catch (e) {
    return INITIAL_REGISTERED_USERS;
  }
}

function saveUser(user) {
  const users = getRegisteredUsers();
  users.push(user);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (e) {
    console.error('Failed to save user to localStorage', e);
  }
}

export function validateEmailFormat(email) {
  if (!email || typeof email !== 'string') return false;
  return EMAIL_REGEX.test(email.trim());
}

export function validatePasswordCriteria(password) {
  if (!password || typeof password !== 'string') return false;
  return PASSWORD_REGEX.test(password);
}

export function getPasswordValidationDetails(password) {
  const pwd = password || '';
  return {
    minLength: pwd.length >= 8,
    hasUpper: /[A-Z]/.test(pwd),
    hasLower: /[a-z]/.test(pwd),
    hasNumber: /\d/.test(pwd),
    hasSpecial: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(pwd)
  };
}

export async function loginUser({ email, password, role }) {
  const trimmedEmail = (email || '').trim().toLowerCase();

  // 1. Email Format Check
  if (!validateEmailFormat(trimmedEmail)) {
    return {
      success: false,
      error: 'Invalid Email Format! Please enter a full valid email address (e.g. user@medisphere.org).'
    };
  }

  // 2. Password Strength Check
  const pwdDetails = getPasswordValidationDetails(password);
  if (!validatePasswordCriteria(password)) {
    let missing = [];
    if (!pwdDetails.minLength) missing.push('at least 8 characters');
    if (!pwdDetails.hasUpper) missing.push('an uppercase letter (A-Z)');
    if (!pwdDetails.hasLower) missing.push('a lowercase letter (a-z)');
    if (!pwdDetails.hasNumber) missing.push('a number (0-9)');
    if (!pwdDetails.hasSpecial) missing.push('a special character (@,#,$,%,etc.)');

    return {
      success: false,
      error: `Password policy violated! Password must contain ${missing.join(', ')}.`
    };
  }

  // 3. User Credentials Check in Registered Users
  const registeredUsers = getRegisteredUsers();
  const matchedUser = registeredUsers.find(
    u => u.email.toLowerCase() === trimmedEmail && u.password === password
  );

  if (!matchedUser) {
    return {
      success: false,
      error: 'Authentication Failed! Email is not registered or incorrect password. Please check your credentials or click Sign Up to register.'
    };
  }

  // Role check warning if role differs
  if (matchedUser.role && matchedUser.role !== role) {
    return {
      success: false,
      error: `Role Mismatch! Account '${trimmedEmail}' is registered as a '${matchedUser.role}', but you selected '${role}'. Please select the '${matchedUser.role}' tab.`
    };
  }

  return {
    success: true,
    user: {
      role: matchedUser.role || role,
      email: matchedUser.email,
      name: matchedUser.name,
      specialty: matchedUser.specialty || '',
      patient: matchedUser.patient || null
    }
  };
}

export async function registerUser({ name, email, password, role, specialty, gender, age }) {
  const trimmedEmail = (email || '').trim().toLowerCase();

  // 1. Name Check
  if (!name || name.trim().length < 2) {
    return { success: false, error: 'Full Name is required (minimum 2 characters).' };
  }

  // 2. Email Check
  if (!validateEmailFormat(trimmedEmail)) {
    return { success: false, error: 'Invalid Email Format! Please enter a valid email address (e.g. user@medisphere.org).' };
  }

  // 3. Duplicate Email Check
  const registeredUsers = getRegisteredUsers();
  if (registeredUsers.some(u => u.email.toLowerCase() === trimmedEmail)) {
    return { success: false, error: 'User Already Exists! An account with this email is already registered.' };
  }

  // 4. Password Criteria Check
  if (!validatePasswordCriteria(password)) {
    return {
      success: false,
      error: 'Weak Password! Password must be at least 8 characters long and include an uppercase letter, lowercase letter, number, and special character.'
    };
  }

  // Build new user record
  const userId = `${role.toLowerCase()}-${Date.now().toString().slice(-4)}`;
  const newUser = {
    id: userId,
    email: trimmedEmail,
    password: password,
    role: role,
    name: name.trim()
  };

  if (role === 'Doctor') {
    newUser.specialty = specialty || 'General Physician';
  } else if (role === 'Patient') {
    newUser.patient = {
      id: userId,
      name: name.trim(),
      age: Number(age) || 30,
      gender: gender || 'Male',
      contact: '+91 98765 00000',
      assignedDoctor: 'Dr. Ramesh Gupta',
      condition: 'General Monitoring',
      email: trimmedEmail
    };
  }

  saveUser(newUser);

  return {
    success: true,
    message: 'Account successfully registered! You can now log in.',
    user: newUser
  };
}

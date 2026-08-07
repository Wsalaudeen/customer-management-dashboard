export function normalizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

export function normalizeCompanyName(name) {
  if (!name) return '';
  const normalized = normalizeText(name);
  return normalized
    .replace(/\b(ltd|limited|llc|plc|inc|incorporated|corp|corporation|group|co)\b/gi, '')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    .trim();
}

export function normalizeEmail(email) {
  if (!email) return '';
  return email.toLowerCase().trim();
}

export function normalizePhone(phone) {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

export function findDuplicateCustomer(newCustomer, existingCustomers = []) {
  if (!newCustomer || !Array.isArray(existingCustomers)) {
    return { isDuplicate: false };
  }

  const newName = normalizeText(newCustomer.businessName);
  const newCleanedName = normalizeCompanyName(newCustomer.businessName);
  const newEmail = normalizeEmail(newCustomer.email);
  const newPhone = normalizePhone(newCustomer.phone);

  for (const existing of existingCustomers) {
    const existingName = normalizeText(existing.businessName);
    const existingCleanedName = normalizeCompanyName(existing.businessName);
    const existingEmail = normalizeEmail(existing.email);
    const existingPhone = normalizePhone(existing.phone);

    if (newName && existingName && (newName === existingName || (newCleanedName && newCleanedName === existingCleanedName))) {
      return {
        isDuplicate: true,
        field: 'businessName',
        matchingCustomer: existing,
        message: `A business with the name "${existing.businessName}" is already registered.`,
      };
    }

    if (newEmail && existingEmail && newEmail === existingEmail) {
      return {
        isDuplicate: true,
        field: 'email',
        matchingCustomer: existing,
        message: `A customer with corporate email address "${existing.email}" already exists.`,
      };
    }

    if (newPhone && existingPhone && newPhone === existingPhone) {
      return {
        isDuplicate: true,
        field: 'phone',
        matchingCustomer: existing,
        message: `A customer with phone number "${existing.phone}" already exists.`,
      };
    }
  }

  return { isDuplicate: false };
}

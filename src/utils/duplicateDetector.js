/**
 * Helper utilities to detect duplicate customer records before registration.
 */

/**
 * Normalizes text strings by lowercasing, trimming, and replacing multiple spaces.
 */
export function normalizeText(str) {
  if (!str) return '';
  return str
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ');
}

/**
 * Normalizes company name by stripping common suffixes like Ltd, LLC, PLC, Inc.
 */
export function normalizeCompanyName(name) {
  if (!name) return '';
  const normalized = normalizeText(name);
  return normalized
    .replace(/\b(ltd|limited|llc|plc|inc|incorporated|corp|corporation|group|co)\b/gi, '')
    .replace(/[.,/#!$%^&*;:{}=\-_`~()]/g, '')
    .trim();
}

/**
 * Normalizes email strings.
 */
export function normalizeEmail(email) {
  if (!email) return '';
  return email.toLowerCase().trim();
}

/**
 * Normalizes phone numbers to digits only for accurate comparison.
 */
export function normalizePhone(phone) {
  if (!phone) return '';
  const digits = phone.replace(/\D/g, '');
  // Take last 10 digits to handle country prefix differences (+234 vs 080...)
  return digits.length >= 10 ? digits.slice(-10) : digits;
}

/**
 * Checks if a candidate newCustomer matches any record in existingCustomers.
 * Returns an object with duplicate details if found, or { isDuplicate: false }.
 */
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

    // 1. Business Name Match (exact normalized or cleaned company name)
    if (newName && existingName && (newName === existingName || (newCleanedName && newCleanedName === existingCleanedName))) {
      return {
        isDuplicate: true,
        field: 'businessName',
        matchingCustomer: existing,
        message: `A business with the name "${existing.businessName}" is already registered.`,
      };
    }

    // 2. Email Address Match
    if (newEmail && existingEmail && newEmail === existingEmail) {
      return {
        isDuplicate: true,
        field: 'email',
        matchingCustomer: existing,
        message: `A customer with corporate email address "${existing.email}" already exists.`,
      };
    }

    // 3. Phone Number Match
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

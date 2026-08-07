import { describe, it, expect } from 'vitest';
import {
  normalizeText,
  normalizeCompanyName,
  normalizeEmail,
  normalizePhone,
  findDuplicateCustomer,
} from '../duplicateDetector';

describe('duplicateDetector Utility', () => {
  const existingCustomers = [
    {
      id: '1',
      businessName: 'Pinnacle Telecom Solutions',
      contactPerson: 'Amaka Iroegbu',
      email: 'amaka@pinnacle.com',
      phone: '+234 803 000 0000',
    },
    {
      id: '2',
      businessName: 'Sterling Media Works Ltd',
      contactPerson: 'Sola Martins',
      email: 'sola@sterlingmedia.com',
      phone: '+234 802 111 2222',
    },
  ];

  it('normalizes text, email, and phone numbers correctly', () => {
    expect(normalizeText('  Pinnacle   Telecom  ')).toBe('pinnacle telecom');
    expect(normalizeCompanyName('Pinnacle Telecom Solutions Ltd.')).toBe('pinnacle telecom solutions');
    expect(normalizeEmail('  AMAKA@Pinnacle.com ')).toBe('amaka@pinnacle.com');
    expect(normalizePhone('+234 803 000 0000')).toBe('8030000000');
  });

  it('detects duplicate by business name regardless of case or whitespace', () => {
    const candidate = {
      businessName: '  pinnacle telecom solutions ',
      contactPerson: 'John Doe',
      email: 'new@email.com',
      phone: '+234 999 888 7777',
    };

    const result = findDuplicateCustomer(candidate, existingCustomers);
    expect(result.isDuplicate).toBe(true);
    expect(result.field).toBe('businessName');
  });

  it('detects duplicate by email address', () => {
    const candidate = {
      businessName: 'Unique New Business',
      contactPerson: 'John Doe',
      email: 'AMAKA@PINNACLE.COM',
      phone: '+234 999 888 7777',
    };

    const result = findDuplicateCustomer(candidate, existingCustomers);
    expect(result.isDuplicate).toBe(true);
    expect(result.field).toBe('email');
  });

  it('detects duplicate by phone number', () => {
    const candidate = {
      businessName: 'Unique New Business',
      contactPerson: 'John Doe',
      email: 'john@newbiz.com',
      phone: '0803 000 0000',
    };

    const result = findDuplicateCustomer(candidate, existingCustomers);
    expect(result.isDuplicate).toBe(true);
    expect(result.field).toBe('phone');
  });

  it('returns isDuplicate false when no matching record exists', () => {
    const candidate = {
      businessName: 'Fresh Brand Enterprises',
      contactPerson: 'David Mark',
      email: 'david@freshbrand.com',
      phone: '+234 815 999 0000',
    };

    const result = findDuplicateCustomer(candidate, existingCustomers);
    expect(result.isDuplicate).toBe(false);
  });
});

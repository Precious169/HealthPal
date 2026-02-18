// Extended session storage utilities for health data

export interface Appointment {
    id: string;
    doctorName: string;
    doctorPhoto: string;
    specialty: string;
    date: string;
    time: string;
    status: 'upcoming' | 'completed' | 'cancelled';
    notes?: string;
}

export interface MedicalRecord {
    id: string;
    title: string;
    type: 'lab' | 'imaging' | 'visit' | 'prescription';
    date: string;
    status: string;
    notes: string;
    fileUrl?: string;
}

export interface Medication {
    id: string;
    name: string;
    dosage: string;
    frequency: string;
    startDate: string;
    endDate?: string;
    takenDoses: string[];
    reminderTime?: string;
}

export interface LabResult {
    id: string;
    testName: string;
    date: string;
    value: number;
    unit: string;
    normalRange: { min: number; max: number };
    status: 'normal' | 'high' | 'low';
}

export interface ContactSubmission {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    date: string;
    type: 'sales' | 'support' | 'general';
}

const APPOINTMENTS_KEY = 'healthpal_appointments';
const RECORDS_KEY = 'healthpal_records';
const MEDICATIONS_KEY = 'healthpal_medications';
const LAB_RESULTS_KEY = 'healthpal_lab_results';
const CONTACTS_KEY = 'healthpal_contacts';

// Appointments
export function getAppointments(): Appointment[] {
    if (typeof window === 'undefined') return [];
    const data = sessionStorage.getItem(APPOINTMENTS_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveAppointment(appointment: Omit<Appointment, 'id'>): Appointment {
    const appointments = getAppointments();
    const newAppointment: Appointment = {
        ...appointment,
        id: `apt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    appointments.push(newAppointment);
    sessionStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(appointments));
    return newAppointment;
}

export function updateAppointmentStatus(id: string, status: Appointment['status']): void {
    const appointments = getAppointments();
    const updated = appointments.map(apt => apt.id === id ? { ...apt, status } : apt);
    sessionStorage.setItem(APPOINTMENTS_KEY, JSON.stringify(updated));
}

// Medical Records
export function getRecords(): MedicalRecord[] {
    if (typeof window === 'undefined') return [];
    const data = sessionStorage.getItem(RECORDS_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveRecord(record: Omit<MedicalRecord, 'id'>): MedicalRecord {
    const records = getRecords();
    const newRecord: MedicalRecord = {
        ...record,
        id: `rec_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    records.push(newRecord);
    sessionStorage.setItem(RECORDS_KEY, JSON.stringify(records));
    return newRecord;
}

export function deleteRecord(id: string): void {
    const records = getRecords().filter(r => r.id !== id);
    sessionStorage.setItem(RECORDS_KEY, JSON.stringify(records));
}

// Medications
export function getMedications(): Medication[] {
    if (typeof window === 'undefined') return [];
    const data = sessionStorage.getItem(MEDICATIONS_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveMedication(medication: Omit<Medication, 'id' | 'takenDoses'>): Medication {
    const medications = getMedications();
    const newMedication: Medication = {
        ...medication,
        id: `med_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        takenDoses: [],
    };
    medications.push(newMedication);
    sessionStorage.setItem(MEDICATIONS_KEY, JSON.stringify(medications));
    return newMedication;
}

export function markDoseTaken(medicationId: string): void {
    const medications = getMedications();
    const updated = medications.map(med =>
        med.id === medicationId
            ? { ...med, takenDoses: [...med.takenDoses, new Date().toISOString()] }
            : med
    );
    sessionStorage.setItem(MEDICATIONS_KEY, JSON.stringify(updated));
}

export function deleteMedication(id: string): void {
    const medications = getMedications().filter(m => m.id !== id);
    sessionStorage.setItem(MEDICATIONS_KEY, JSON.stringify(medications));
}

// Lab Results
export function getLabResults(): LabResult[] {
    if (typeof window === 'undefined') return [];
    const data = sessionStorage.getItem(LAB_RESULTS_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveLabResult(result: Omit<LabResult, 'id'>): LabResult {
    const results = getLabResults();
    const newResult: LabResult = {
        ...result,
        id: `lab_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    };
    results.push(newResult);
    sessionStorage.setItem(LAB_RESULTS_KEY, JSON.stringify(results));
    return newResult;
}

// Contact Submissions
export function getContactSubmissions(): ContactSubmission[] {
    if (typeof window === 'undefined') return [];
    const data = sessionStorage.getItem(CONTACTS_KEY);
    return data ? JSON.parse(data) : [];
}

export function saveContactSubmission(
    submission: Omit<ContactSubmission, 'id' | 'date'>
): ContactSubmission {
    const submissions = getContactSubmissions();
    const newSubmission: ContactSubmission = {
        ...submission,
        id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        date: new Date().toISOString(),
    };
    submissions.push(newSubmission);
    sessionStorage.setItem(CONTACTS_KEY, JSON.stringify(submissions));
    return newSubmission;
}

// Initialize with sample data if empty
export function initializeSampleData(force: boolean = false): void {
    if (typeof window === 'undefined') return;

    if (!force) return;

    // Sample appointments
    if (getAppointments().length === 0) {
        saveAppointment({
            doctorName: 'Dr. Sarah Johnson',
            doctorPhoto: '/doctor-1.jpg',
            specialty: 'Cardiology',
            date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
            time: '10:00 AM',
            status: 'upcoming',
            notes: 'Annual checkup',
        });
    }

    // Sample records
    if (getRecords().length === 0) {
        saveRecord({
            title: 'CBC Blood Panel',
            type: 'lab',
            date: '2024-01-15',
            status: 'Normal',
            notes: 'All values within normal range',
        });
    }

    // Sample medications
    if (getMedications().length === 0) {
        saveMedication({
            name: 'Lisinopril',
            dosage: '10mg',
            frequency: 'daily',
            startDate: '2024-01-01',
            reminderTime: '08:00',
        });
    }

    // Sample lab results
    if (getLabResults().length === 0) {
        saveLabResult({
            testName: 'Blood Glucose',
            date: '2024-01-15',
            value: 95,
            unit: 'mg/dL',
            normalRange: { min: 70, max: 100 },
            status: 'normal',
        });
    }
}

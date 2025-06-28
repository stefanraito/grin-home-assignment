import { Employee } from "../models/employee.model";
import { EventModel } from "../models/event.model";
import { Patient } from "../models/patient.model";

export interface DatasetSchema {
  liveCalls: EventModel[];
  communication: EventModel[];
  tasks: EventModel[];
  likes: EventModel[];
  patientsSatisfaction: {
    patientsData: Patient[];
    summary: SentimentCounts;
  };
  employeesSatisfaction: {
    employeesData: Employee[];
    summary: SentimentCounts;
  }
}

export interface SentimentCounts {
  positive: number;
  neutral: number;
  negative: number;
}

export interface SatisfactionResponse {
  employees: SentimentCounts;
  patients: SentimentCounts;
}
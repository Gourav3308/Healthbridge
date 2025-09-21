import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent)
  },
  {
    path: 'auth',
    children: [
      {
        path: 'login',
        loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent)
      },
      {
        path: 'register',
        loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent)
      },
      {
        path: 'callback',
        loadComponent: () => import('./components/auth/oauth2-callback/oauth2-callback.component').then(m => m.OAuth2CallbackComponent)
      },
      {
        path: 'forgot-password',
        loadComponent: () => import('./components/auth/forgot-password/forgot-password.component').then(m => m.ForgotPasswordComponent)
      },
      {
        path: 'reset-password',
        loadComponent: () => import('./components/auth/reset-password/reset-password.component').then(m => m.ResetPasswordComponent)
      }
    ]
  },
  {
    path: 'patient',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/patient/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'doctors',
        loadComponent: () => import('./components/patient/doctors/doctors.component').then(m => m.DoctorsComponent)
      },
      {
        path: 'doctor-details/:id',
        loadComponent: () => import('./components/patient/doctor-details/doctor-details.component').then(m => m.DoctorDetailsComponent)
      },
      {
        path: 'appointments',
        loadComponent: () => import('./components/patient/appointments/appointments.component').then(m => m.AppointmentsComponent)
      },
      {
        path: 'book-appointment',
        loadComponent: () => import('./components/patient/book-appointment/book-appointment.component').then(m => m.BookAppointmentComponent)
      },
      {
        path: 'edit-profile',
        loadComponent: () => import('./components/patient/edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
      }
    ]
  },
  {
    path: 'doctor',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/doctor/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'appointments',
        loadComponent: () => import('./components/doctor/appointments/appointments.component').then(m => m.AppointmentsComponent)
      },
      {
        path: 'pending-appointments',
        loadComponent: () => import('./components/doctor/pending-appointments/pending-appointments.component').then(m => m.PendingAppointmentsComponent)
      },
      {
        path: 'patient-details/:id',
        loadComponent: () => import('./components/doctor/patient-details/patient-details.component').then(m => m.PatientDetailsComponent)
      },
      {
        path: 'patients',
        loadComponent: () => import('./components/doctor/patients/patients.component').then(m => m.PatientsComponent)
      },
      {
        path: 'edit-profile',
        loadComponent: () => import('./components/doctor/edit-profile/edit-profile.component').then(m => m.EditProfileComponent)
      }
    ]
  },
  {
    path: 'admin',
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./components/admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
      },
      {
        path: 'doctors',
        loadComponent: () => import('./components/admin/doctors/doctors.component').then(m => m.DoctorsComponent)
      },
      {
        path: 'manage-doctors',
        loadComponent: () => import('./components/admin/manage-doctors/manage-doctors.component').then(m => m.ManageDoctorsComponent)
      },
      {
        path: 'manage-patients',
        loadComponent: () => import('./components/admin/manage-patients/manage-patients.component').then(m => m.ManagePatientsComponent)
      },
      {
        path: 'doctor-details/:id',
        loadComponent: () => import('./components/admin/doctor-details/doctor-details.component').then(m => m.DoctorDetailsComponent)
      },
      {
        path: 'edit-doctor/:id',
        loadComponent: () => import('./components/admin/edit-doctor/edit-doctor.component').then(m => m.EditDoctorComponent)
      },
      {
        path: 'edit-patient/:id',
        loadComponent: () => import('./components/admin/edit-patient/edit-patient.component').then(m => m.EditPatientComponent)
      },
      {
        path: 'patient-details/:id',
        loadComponent: () => import('./components/admin/patient-details/patient-details.component').then(m => m.PatientDetailsComponent)
      },
      {
        path: 'test',
        loadComponent: () => import('./components/admin/admin-test/admin-test.component').then(m => m.AdminTestComponent)
      }
    ]
  },
  {
    path: 'info',
    children: [
      {
        path: 'medicine-categories',
        children: [
          {
            path: 'general-medicine',
            loadComponent: () => import('./components/info/medicine-categories/general-medicine/general-medicine.component').then(m => m.GeneralMedicineComponent)
          },
          {
            path: 'heart-care',
            loadComponent: () => import('./components/info/medicine-categories/heart-care/heart-care.component').then(m => m.HeartCareComponent)
          },
          {
            path: 'neurological',
            loadComponent: () => import('./components/info/medicine-categories/neurological/neurological.component').then(m => m.NeurologicalComponent)
          },
          {
            path: 'pediatric',
            loadComponent: () => import('./components/info/medicine-categories/pediatric/pediatric.component').then(m => m.PediatricComponent)
          },
          {
            path: 'fever-care',
            loadComponent: () => import('./components/info/medicine-categories/fever-care/fever-care.component').then(m => m.FeverCareComponent)
          },
          {
            path: 'pain-relief',
            loadComponent: () => import('./components/info/medicine-categories/pain-relief/pain-relief.component').then(m => m.PainReliefComponent)
          },
          {
            path: 'digestive-health',
            loadComponent: () => import('./components/info/medicine-categories/digestive-health/digestive-health.component').then(m => m.DigestiveHealthComponent)
          },
          {
            path: 'respiratory-care',
            loadComponent: () => import('./components/info/medicine-categories/respiratory-care/respiratory-care.component').then(m => m.RespiratoryCareComponent)
          },
          {
            path: 'diabetes-care',
            loadComponent: () => import('./components/info/medicine-categories/diabetes-care/diabetes-care.component').then(m => m.DiabetesCareComponent)
          },
          {
            path: 'allergy-relief',
            loadComponent: () => import('./components/info/medicine-categories/allergy-relief/allergy-relief.component').then(m => m.AllergyReliefComponent)
          },
          {
            path: 'vitamins-supplements',
            loadComponent: () => import('./components/info/medicine-categories/vitamins-supplements/vitamins-supplements.component').then(m => m.VitaminsSupplementsComponent)
          },
          {
            path: 'skin-care',
            loadComponent: () => import('./components/info/medicine-categories/skin-care/skin-care.component').then(m => m.SkinCareComponent)
          },
          {
            path: 'womens-health',
            loadComponent: () => import('./components/info/medicine-categories/womens-health/womens-health.component').then(m => m.WomensHealthComponent)
          },
          {
            path: 'mens-health',
            loadComponent: () => import('./components/info/medicine-categories/mens-health/mens-health.component').then(m => m.MensHealthComponent)
          },
          {
            path: 'eye-care',
            loadComponent: () => import('./components/info/medicine-categories/eye-care/eye-care.component').then(m => m.EyeCareComponent)
          },
          {
            path: 'bone-joint-care',
            loadComponent: () => import('./components/info/medicine-categories/general-medicine/general-medicine.component').then(m => m.GeneralMedicineComponent)
          },
          {
            path: 'immune-support',
            loadComponent: () => import('./components/info/medicine-categories/immune-support/immune-support.component').then(m => m.ImmuneSupportComponent)
          },
          {
            path: 'mental-health',
            loadComponent: () => import('./components/info/medicine-categories/neurological/neurological.component').then(m => m.NeurologicalComponent)
          },
          {
            path: 'elderly-care',
            loadComponent: () => import('./components/info/medicine-categories/general-medicine/general-medicine.component').then(m => m.GeneralMedicineComponent)
          },
          {
            path: 'emergency-medicines',
            loadComponent: () => import('./components/info/medicine-categories/emergency-medicines/emergency-medicines.component').then(m => m.EmergencyMedicinesComponent)
          },
          {
            path: 'chronic-conditions',
            loadComponent: () => import('./components/info/medicine-categories/chronic-conditions/chronic-conditions.component').then(m => m.ChronicConditionsComponent)
          },
          {
            path: 'herbal-natural',
            loadComponent: () => import('./components/info/medicine-categories/herbal-natural/herbal-natural.component').then(m => m.HerbalNaturalComponent)
          },
          {
            path: 'infection-control',
            loadComponent: () => import('./components/info/medicine-categories/infection-control/infection-control.component').then(m => m.InfectionControlComponent)
          }
        ]
      },
      {
        path: 'features',
        children: [
          {
            path: 'online-appointments',
            loadComponent: () => import('./components/info/features/online-appointments/online-appointments.component').then(m => m.OnlineAppointmentsComponent)
          },
          {
            path: 'prescription-management',
            loadComponent: () => import('./components/info/features/prescription-management/prescription-management.component').then(m => m.PrescriptionManagementComponent)
          },
          {
            path: 'verified-medical-experts',
            loadComponent: () => import('./components/info/features/verified-medical-experts/verified-medical-experts.component').then(m => m.VerifiedMedicalExpertsComponent)
          }
        ]
      },
      {
        path: 'legal',
        children: [
          {
            path: 'privacy-policy',
            loadComponent: () => import('./components/info/legal/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
          },
          {
            path: 'terms-of-service',
            loadComponent: () => import('./components/info/legal/terms-of-service/terms-of-service.component').then(m => m.TermsOfServiceComponent)
          }
        ]
      },
      {
        path: 'support',
        children: [
          {
            path: 'faq',
            loadComponent: () => import('./components/info/support/faq/faq.component').then(m => m.FaqComponent)
          },
          {
            path: 'contact',
            loadComponent: () => import('./components/info/support/support/support.component').then(m => m.SupportComponent)
          }
        ]
      }
    ]
  },
  {
    path: '**',
    redirectTo: ''
  }
];

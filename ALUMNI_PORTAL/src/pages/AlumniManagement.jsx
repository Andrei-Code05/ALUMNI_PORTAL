// src/pages/AlumniManagement.jsx
import React from 'react';
import UserManagement from '../components/alumni_management/UserManagement.jsx';
import UserVerification from '../components/alumni_management/UserVerification.jsx';

const mockUsers = [
  { id: 1, name: "Bill Gates", email: "billgates@highlysucceed.com", roles: ["Manager", "Admin", "Intern", "Developer", "Human Resource"] },
  { id: 2, name: "Ser Geybin", email: "sergeybin@highlysucceed.com", roles: ["Intern"] },
  { id: 3, name: "Jonathan Calvo", email: "jcalvo@highlysucceed.com", roles: ["Employee", "Quality Assurance"] },
  { id: 4, name: "User Three", email: "user3@highlysucceed.com", roles: ["Employee"] },
  { id: 5, name: "User Four", email: "user4@highlysucceed.com", roles: ["Employee", "Mobile Developer"] },
  { id: 6, name: "User Five", email: "user5@highlysucceed.com", roles: ["Employee"] },
  { id: 7, name: "User Six", email: "user6@highlysucceed.com", roles: ["Employee", "Analyst", "Trainer"] },
  { id: 8, name: "User Seven", email: "user7@highlysucceed.com", roles: ["Employee"] },
  { id: 9, name: "User Eight", email: "user8@highlysucceed.com", roles: ["Employee"] },
  { id: 10, name: "User Nine", email: "user9@highlysucceed.com", roles: ["Employee", "Quality Assurance", "UI/UX Designer", "Trainer"] },
  { id: 11, name: "User Ten", email: "user10@highlysucceed.com", roles: ["Employee"] },
  { id: 12, name: "User Eleven", email: "user11@highlysucceed.com", roles: ["Manager"] },
  { id: 13, name: "User Twelve", email: "user12@highlysucceed.com", roles: ["Admin"] },
];

const mockPendingVerifications = [
  { id: 1, position: "Senior Frontend Developer", name: "John Andrei Alzate", department: "Web Development Department", roles: ["Manager", "Admin", "Team Leader", "Developer", "Human Resource", "Quality Assurance"], skills: ["Python", "JavaScript", "HTML", "PHP", "Laravel", "React", "TypeScript"] },
  { id: 2, position: "Senior Frontend Developer", name: "Steve Jobs", department: "Web Development Department", roles: ["Admin"], skills: ["Python", "JavaScript", "HTML", "PHP", "Laravel"] },
  { id: 3, position: "Backend Engineer", name: "Mark Zuckerberg", department: "Backend Services", roles: ["Admin"], skills: ["Node.js", "Express", "MongoDB", "PostgreSQL", "Docker"] },
  { id: 4, position: "UI/UX Designer", name: "Elon Musk", department: "Product Design", roles: ["Admin"], skills: ["Figma", "Adobe XD", "User Research", "Prototyping"] },
  { id: 5, position: "DevOps Engineer", name: "Larry Pager", department: "Infrastructure", roles: ["Admin"], skills: ["AWS", "Kubernetes", "CI/CD", "Terraform", "Jenkins"] },
  { id: 6, position: "Mobile Developer", name: "Sergey Brin", department: "Mobile Apps" , roles:["Admin"], skills:["Flutter","Dart","React Native","iOS","Android"] },
];

export default function AlumniManagement() {
  return (
    <div className="px-6 sm:px-12 lg:px-20 py-8 space-y-16 bg-[#EFEFEF] min-h-screen">
      <UserManagement mockUsers={mockUsers} />
      <UserVerification mockPendingVerifications={mockPendingVerifications} />
    </div>
  );
}
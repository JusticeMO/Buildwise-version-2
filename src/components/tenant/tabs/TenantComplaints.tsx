
import React, { useState } from 'react';
import { CheckCircle, Upload } from 'lucide-react';
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import Button from '@/components/shared/Button';
import { Label } from '@/components/ui/label';
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const TenantComplaints = () => {
  const [complaintType, setComplaintType] = useState("");
  const [submitted, setSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Complaint submitted successfully");
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };
  
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">File a Complaint</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <form onSubmit={handleSubmit}>
              <div className="space-y-6">
                <div>
                  <Label htmlFor="complaint-type" className="font-medium">Complaint Type</Label>
                  <Select value={complaintType} onValueChange={setComplaintType}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select complaint type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Maintenance Issue</SelectItem>
                      <SelectItem value="noise">Noise Complaint</SelectItem>
                      <SelectItem value="security">Security Concern</SelectItem>
                      <SelectItem value="billing">Billing Problem</SelectItem>
                      <SelectItem value="neighbor">Neighbor Dispute</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="subject" className="font-medium">Subject</Label>
                  <Input id="subject" className="mt-1.5" placeholder="Brief description of the issue" />
                </div>
                
                <div>
                  <Label htmlFor="description" className="font-medium">Description</Label>
                  <Textarea 
                    id="description" 
                    className="mt-1.5" 
                    rows={5}
                    placeholder="Please provide detailed information about your complaint"
                  />
                </div>
                
                <div>
                  <Label className="font-medium">Upload Evidence (optional)</Label>
                  <div className="mt-1.5 border-2 border-dashed rounded-lg p-8 text-center cursor-pointer hover:bg-secondary/20 transition-colors">
                    <Upload className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-sm font-medium">Click or drag files to upload</p>
                    <p className="text-xs text-muted-foreground mt-1">Supports JPG, PNG and PDF up to 5MB</p>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="urgency" className="font-medium">Urgency Level</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="Select urgency level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Not urgent</SelectItem>
                      <SelectItem value="medium">Medium - Needs attention within 48 hours</SelectItem>
                      <SelectItem value="high">High - Needs immediate attention</SelectItem>
                      <SelectItem value="emergency">Emergency - Danger to person or property</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="preferred-contact" className="font-medium">Preferred Contact Method</Label>
                  <Select>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue placeholder="How should we contact you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="phone">Phone Call</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="app">App Notification</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button type="submit" className="w-full">Submit Complaint</Button>
              </div>
            </form>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
            <h3 className="font-medium mb-4">Recent Complaints</h3>
            <div className="space-y-4">
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Water Leakage in Bathroom</p>
                    <p className="text-xs text-muted-foreground">Submitted: June 15, 2023</p>
                  </div>
                  <Badge variant="secondary" className="bg-amber-100 text-amber-800">
                    In Progress
                  </Badge>
                </div>
              </div>
              <div className="border rounded-md p-3">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-sm">Broken Window Lock</p>
                    <p className="text-xs text-muted-foreground">Submitted: May 23, 2023</p>
                  </div>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Resolved
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" size="sm" className="mt-4 w-full">View All Complaints</Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="font-medium mb-4">Complaint Guidelines</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                <span>Provide clear and specific details about the issue</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                <span>Upload photos or videos as evidence when possible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                <span>Use appropriate urgency levels to ensure proper response times</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle size={16} className="text-green-600 mt-0.5" />
                <span>For emergencies like gas leaks or flooding, call the emergency hotline</span>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-red-50 rounded-md text-sm">
              <p className="font-medium text-red-800">Emergency Hotline</p>
              <p className="text-red-700">+254 700 123 456</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TenantComplaints;

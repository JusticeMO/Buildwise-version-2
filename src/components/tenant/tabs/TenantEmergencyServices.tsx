import React from 'react';
import { Phone, Ambulance, Flame, Shield, Hospital, ActivitySquare, AlertTriangle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

const TenantEmergencyServices = () => {
  const emergencyServices = [
    {
      name: "Ambulance",
      number: "911",
      icon: <Ambulance size={24} />,
      color: "bg-red-100 text-red-700",
      description: "For medical emergencies requiring immediate transport"
    },
    {
      name: "Fire Brigade",
      number: "999",
      icon: <Flame size={24} />,
      color: "bg-orange-100 text-orange-700",
      description: "For fire emergencies and rescue operations"
    },
    {
      name: "Police",
      number: "999",
      icon: <Shield size={24} />,
      color: "bg-blue-100 text-blue-700",
      description: "For crime reporting and emergency police assistance"
    },
    {
      name: "Hospital",
      number: "0712-345678",
      icon: <Hospital size={24} />,
      color: "bg-green-100 text-green-700",
      description: "Nearest hospital for non-emergency medical care"
    },
    {
      name: "First Aid",
      number: "0787-654321",
      icon: <ActivitySquare size={24} />,
      color: "bg-amber-100 text-amber-700",
      description: "For minor injuries and first aid assistance"
    },
    {
      name: "Security Company",
      number: "0723-111222",
      icon: <AlertTriangle size={24} />,
      color: "bg-purple-100 text-purple-700",
      description: "Property security company for safety concerns"
    }
  ];

  const handleCallService = (number: string, name: string) => {
    console.log(`Calling ${name} at ${number}`);
    window.location.href = `tel:${number}`;
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Emergency Services</h2>
      <p className="text-muted-foreground mb-6">
        Quick access to emergency contacts for urgent situations
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {emergencyServices.map((service, index) => (
          <Card key={index} className="overflow-hidden hover:shadow-md transition-all duration-200">
            <div className="p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className={cn("p-3 rounded-full", service.color)}>
                  {service.icon}
                </div>
                <div>
                  <h3 className="font-medium">{service.name}</h3>
                  <p className="text-sm text-muted-foreground">{service.description}</p>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <div className="text-lg font-semibold">{service.number}</div>
                <button 
                  onClick={() => handleCallService(service.number, service.name)}
                  className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-md hover:bg-primary/90 transition-colors"
                >
                  <Phone size={16} />
                  Call Now
                </button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <div className="mt-8 bg-amber-50 p-4 rounded-md border border-amber-200">
        <h3 className="flex items-center gap-2 font-medium text-amber-800 mb-2">
          <Shield size={18} /> Important Information
        </h3>
        <p className="text-sm text-amber-700">
          In case of emergency, call the appropriate service immediately. For property-related emergencies, also notify your property manager through the messaging system after contacting emergency services.
        </p>
      </div>
    </div>
  );
};

export default TenantEmergencyServices;

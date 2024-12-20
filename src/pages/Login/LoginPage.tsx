import React from "react";
import { Github, GitlabIcon } from "lucide-react";
import place from "../../assets/Subtract1.png";
import bg from "../../assets/Subtract.png";
import bitBucketLogo from "../../assets/bitbucket.png";
import azureLogo from "../../assets/azure.png";
import vectorImage from "../../assets/vector_image.png";
import keySso from "../../assets/key.png";
import { useState } from "react";
interface Stat {
  label: string;
  value: string;
}

interface LoginPageProps {
  onLogin?: (provider: AuthProvider) => void;
  onToggleHosting?: (type: HostingType) => void;
}

type AuthProvider = "github" | "bitbucket" | "azure" | "gitlab";
type HostingType = "saas" | "self-hosted";

const LoginPage: React.FC<LoginPageProps> = ({ onLogin, onToggleHosting }) => {
  const [hostingType, setHostingType] = useState<HostingType>("saas");

  const stats: Stat[] = [
    { label: "Language Support", value: "30+" },
    { label: "Developers", value: "10K+" },
    { label: "Hours Saved", value: "100K+" },
  ];

  const handleLogin = (provider: AuthProvider): void => {
    onLogin?.(provider);
  };

  const handleHostingToggle = (type: HostingType): void => {
    setHostingType(type);
    onToggleHosting?.(type);
  };

  const getLoginOptions = () => {
    if (hostingType === "self-hosted") {
      return [
        {
          provider: "gitlab",
          icon: <GitlabIcon className="w-5 h-5 text-orange-500" />,
          label: "GitLab",
        },
        {
          provider: "sso",
          icon: (
            <img
              src={keySso}
              alt="SSO"
              className="w-5 h-5 flex items-center justify-center font-bold"
            ></img>
          ),
          label: "SSO",
        },
      ];
    }

    return [
      {
        provider: "github",
        icon: <Github className="w-5 h-5" />,
        label: "Github",
      },
      {
        provider: "bitbucket",
        icon: <img src={bitBucketLogo} alt="Bitbucket" className="w-5 h-5" />,
        label: "Bitbucket",
      },
      {
        provider: "azure",
        icon: <img src={azureLogo} alt="Azure" className="w-5 h-5" />,
        label: "Azure Devops",
      },
      {
        provider: "gitlab",
        icon: <GitlabIcon className="w-5 h-5 text-orange-500" />,
        label: "GitLab",
      },
    ];
  };

  return (
    <div className="min-h-screen bg-white flex flex-col lg:flex-row">
      {/* Left side with stats */}
      <div className="relative w-full lg:w-1/2 p-4 lg:p-8 hidden lg:block">
        <div className="absolute mt-[-10px] top-1/4 left-1/4 z-10 w-full space-y-4  max-w-md">
          <div className="bg-white h-40  rounded-2xl shadow-lg p-4 lg:p-6">
            <div className="flex items-center  gap-3 mb-4 lg:mb-6">
              <img
                src={place}
                alt="CodeAnt Logo"
                className="w-6 h-6 lg:w-8 lg:h-8"
              />
              <span className="text-gray-900  font-semibold text-sm lg:text-base">
                AI to Detect & Autofix Bad Code
              </span>
            </div>

            <div className="border-b border-black/30 my-4 w-full"></div>

            <div className="flex justify-between">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="font-bold text-lg lg:text-xl">
                    {stat.value}
                  </div>
                  <div className="text-xs lg:text-sm text-gray-600">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute top-80 right-24 z-20 w-60">
          <div className="bg-white rounded-2xl shadow-xl p-4 lg:p-6">
            <div className="flex justify-between items-center gap-2 mb-2">
              <div className="w-8 h-8 lg:w-10 lg:h-10 bg-purple-200 rounded-full flex justify-center items-center">
                <img src={vectorImage} alt="vector" />
              </div>
              <div className="font-semibold text-sm lg:text-base">
                <span className="text-blue-500">↑ 14% </span> <br /> This week
              </div>
            </div>
            <div>
              <div className="font-bold mt-2">
                Issues Fixed
              </div>
              <div className="font-bold text-4xl">500K+</div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 opacity-50 lg:opacity-100">
          <img src={bg} alt="Background Logo" className="w-60 lg:w-72" />
        </div>
      </div>

      {/* Right side with login */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 lg:p-8">
        <div className="w-full max-w-sm lg:max-w-md">
          <div className="text-center mb-6 lg:mb-8">
            <img
              src={place}
              alt="CodeAnt Logo"
              className="w-8 h-8 lg:w-10 lg:h-10 mx-auto mb-3 lg:mb-4"
            />
            <h1 className="text-xl lg:text-2xl font-bold mb-2">
              Welcome to CodeAnt AI
            </h1>
          </div>

          <div className="flex gap-3 lg:gap-4 mb-4">
            <button
              className="flex-1 bg-blue-500 text-white py-2 px-3 lg:px-4 rounded-md text-sm lg:text-base"
              onClick={() => handleHostingToggle("saas")}
            >
              SAAS
            </button>
            <button
              className="flex-1 text-gray-700 py-2 px-3 lg:px-4 rounded-md border text-sm lg:text-base"
              onClick={() => handleHostingToggle("self-hosted")}
            >
              Self Hosted
            </button>
          </div>

          <div className="space-y-3 lg:space-y-4">
            {getLoginOptions().map(({ provider, icon, label }) => (
              <button
                key={provider}
                className="w-full flex items-center justify-center gap-2 py-2 px-4 border rounded-md hover:bg-gray-50 text-sm lg:text-base"
                onClick={() => handleLogin(provider as AuthProvider)}
              >
                {icon}
                Sign in with {label}
              </button>
            ))}
          </div>

          <div className="text-center text-xs lg:text-sm text-gray-600 mt-4 lg:mt-6">
            By signing up you agree to the{" "}
            <a href="#" className="text-gray-900">
              Privacy Policy
            </a>
            .
          </div>

          <div className="absolute bottom-0 left-0 opacity-50 lg:opacity-100">
            <img src={bg} alt="Background Logo" className="w-60 lg:w-72" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

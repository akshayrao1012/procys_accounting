import React from 'react';
import { useRouter } from 'next/router';

const OnboardingPage = () => {
  const router = useRouter();

  return (
    <div>
      <header>
        <h1>Procys</h1>
      </header>
      <main>
        <p>Welcome to Procys!</p>
        {/* rest of code here */}
      </main>
    </div>
  );
};

export default OnboardingPage;

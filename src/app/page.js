// "use client";
// import { SocialProvider } from "@/contexts/socialContext";

//  // Ensure this is a Client Component if it uses client-specific features

// export default function HomePage() {
//   return (
//     <SocialProvider>
//       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
//         <div>
//           <h1>Welcome to OneClick</h1>
//           <p>This is now your main dashboard page. Accessible to all visitors.</p>
//         </div>
//       </div>
//     </SocialProvider>
//   );
// }

"use client";
import { useEffect } from 'react';
import { SocialProvider } from "@/contexts/socialContext";

// Ensure this is a Client Component if it uses client-specific features

export default function HomePage() {
  useEffect(() => {
    // Set a timeout to redirect after 3 seconds
    const timer = setTimeout(() => {
      window.location.href = '/dashboard';
    }, 3000);

    // Cleanup the timer if the component is unmounted
    return () => clearTimeout(timer);
  }, []);

  return (
    <SocialProvider>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <div>
          <h1>Welcome to OneClick</h1>
          <p>This is now your main dashboard page. Accessible to all visitors.</p>
        </div>
      </div>
    </SocialProvider>
  );
}
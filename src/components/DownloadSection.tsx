import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download } from "lucide-react";
import downloadImage from "@/assets/download-agents.jpg";

export const DownloadSection = () => {
  const [downloading, setDownloading] = useState<string | null>(null);

  // Hidden download URLs (no exposure on hover)
  const LINUX_URL =
    "https://github.com/Boluex/techfix-frontend/releases/download/v1.0.0/AI_Tech_Repairer_Agent_Linux.zip";
  const WINDOWS_URL =
    "https://github.com/Boluex/techfix-frontend/releases/download/v1.0.0/TechFixAgent.zip";

  // Track download analytics
  const trackDownload = async (platform: string) => {
    try {
      await fetch('https://techfixai-backend.onrender.com/track-download', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: platform,
          version: '1.0.0',
        }),
      });
      console.log(`✅ Download tracked: ${platform}`);
    } catch (error) {
      console.error('Failed to track download:', error);
      // Don't block download if tracking fails
    }
  };

  // Secure programmatic download handler with analytics
  const handleDownload = async (platform: string, url: string, filename: string) => {
    setDownloading(platform);
    
    // Track the download event
    await trackDownload(platform);
    
    // Trigger the actual download
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset downloading state after 2 seconds
    setTimeout(() => setDownloading(null), 2000);
  };

  return (
    <section className="py-20 bg-background relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Download options */}
          <div>
            <div className="text-center lg:text-left mb-12">
              <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Download AI Tech Repairer Agent
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Fix software issues automatically — no installation needed. Just download and run.
              </p>
            </div>

            <div className="grid gap-6">
              {/* Linux Agent */}
              <Card className="tech-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold">Linux Agent</CardTitle>
                      <CardDescription>Ubuntu, Debian, Fedora, Mint & more</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <div className="font-mono text-xs bg-muted/50 px-2 py-1 rounded mb-2">
                        AI_Tech_Repairer_Linux.zip
                      </div>
                      <div>Size: ~25MB • Includes run.sh, agent, and executor</div>
                    </div>
                    <Button
                      onClick={() =>
                        handleDownload("linux", LINUX_URL, "AI_Tech_Repairer_Linux.zip")
                      }
                      disabled={downloading === "linux"}
                      variant="default"
                      className={`shrink-0 transition-all ${
                        downloading === "linux"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-teal-600 hover:bg-teal-700"
                      } text-white`}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {downloading === "linux" ? "Downloading..." : "Download for Linux"}
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Windows Agent */}
              <Card className="tech-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
                <CardHeader className="pb-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.676-2.154-1.415-3.414l5-5A2 2 0 008 9.172V4z" />
                      </svg>
                    </div>
                    <div>
                      <CardTitle className="text-xl font-semibold">Windows Agent</CardTitle>
                      <CardDescription>Windows 10 / 11 (64-bit)</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                    <div className="text-sm text-muted-foreground">
                      <div className="font-mono text-xs bg-muted/50 px-2 py-1 rounded mb-2">
                        AI_Tech_Repairer_Windows.zip
                      </div>
                      <div>Size: ~28MB • Portable EXE, no admin rights needed</div>
                    </div>
                    <Button
                      onClick={() =>
                        handleDownload("windows", WINDOWS_URL, "AI_Tech_Repairer_Windows.zip")
                      }
                      disabled={downloading === "windows"}
                      variant="default"
                      className={`shrink-0 transition-all ${
                        downloading === "windows"
                          ? "bg-green-600 hover:bg-green-700"
                          : "bg-blue-600 hover:bg-blue-700"
                      } text-white`}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {downloading === "windows" ? "Downloading..." : "Download for Windows"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Usage instructions */}
            <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border/50">
              <h3 className="font-semibold text-foreground mb-3">How to Run:</h3>
              <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
                <li>Download the agent for your OS</li>
                <li>Extract the ZIP file</li>
                <li>Open terminal in the folder</li>
                <li>Make script executable: <code className="bg-muted px-1 rounded">chmod +x run.sh</code></li>
                <li>Run: <code className="bg-muted px-1 rounded">./run.sh</code></li>
                <li>Enter your 8-digit service token when prompted</li>
              </ol>
            </div>

            <div className="mt-6 p-4 bg-yellow-50/50 border border-yellow-200 rounded-lg">
              <p className="text-sm text-yellow-800">
                💡 No payment, we'll email your service token within minutes.
              </p>
            </div>
          </div>

          {/* Right side - Image */}
          <div className="relative">
            <div className="relative group">
              <img 
                src={downloadImage} 
                alt="Download AI Tech Repairer Agent for Linux and Windows" 
                className="w-full h-auto rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 tech-glow"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};





















































// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Download } from "lucide-react";
// import downloadImage from "@/assets/download-agents.jpg";

// export const DownloadSection = () => {
//   // Hidden download URLs (no exposure on hover)
//   const LINUX_URL =
//     "https://github.com/Boluex/techfix-frontend/releases/download/v1.0.0/AI_Tech_Repairer_Agent_Linux.zip";
//   const WINDOWS_URL =
//     "https://github.com/Boluex/techfix-frontend/releases/download/v1.0.0/TechFixAgent.zip";

//   // Secure programmatic download handler
//   const handleDownload = (url: string, filename: string) => {
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = filename;
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);
//   };

//   return (
//     <section className="py-20 bg-background relative overflow-hidden">
//       {/* Background decoration */}
//       <div className="absolute inset-0 overflow-hidden">
//         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
//       </div>

//       <div className="container mx-auto px-6 relative z-10">
//         <div className="grid lg:grid-cols-2 gap-12 items-center">
//           {/* Left side - Download options */}
//           <div>
//             <div className="text-center lg:text-left mb-12">
//               <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
//                 Download AI Tech Repairer Agent
//               </h2>
//               <p className="text-xl text-muted-foreground leading-relaxed">
//                 Fix software issues automatically — no installation needed. Just download and run.
//               </p>
//             </div>

//             <div className="grid gap-6">
//               {/* Linux Agent */}
//               <Card className="tech-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
//                 <CardHeader className="pb-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                       <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <CardTitle className="text-xl font-semibold">Linux Agent</CardTitle>
//                       <CardDescription>Ubuntu, Debian, Fedora, Mint & more</CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//                     <div className="text-sm text-muted-foreground">
//                       <div className="font-mono text-xs bg-muted/50 px-2 py-1 rounded mb-2">
//                         AI_Tech_Repairer_Linux.zip
//                       </div>
//                       <div>Size: ~25MB • Includes run.sh, agent, and executor</div>
//                     </div>
//                     <Button
//                       onClick={() =>
//                         handleDownload(LINUX_URL, "AI_Tech_Repairer_Linux.zip")
//                       }
//                       variant="default"
//                       className="bg-teal-600 hover:bg-teal-700 text-white shrink-0"
//                     >
//                       <Download className="w-4 h-4 mr-2" />
//                       Download for Linux
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Windows Agent */}
//               <Card className="tech-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
//                 <CardHeader className="pb-4">
//                   <div className="flex items-center gap-4">
//                     <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
//                       <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.676-2.154-1.415-3.414l5-5A2 2 0 008 9.172V4z" />
//                       </svg>
//                     </div>
//                     <div>
//                       <CardTitle className="text-xl font-semibold">Windows Agent</CardTitle>
//                       <CardDescription>Windows 10 / 11 (64-bit)</CardDescription>
//                     </div>
//                   </div>
//                 </CardHeader>
//                 <CardContent>
//                   <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
//                     <div className="text-sm text-muted-foreground">
//                       <div className="font-mono text-xs bg-muted/50 px-2 py-1 rounded mb-2">
//                         AI_Tech_Repairer_Windows.zip
//                       </div>
//                       <div>Size: ~28MB • Portable EXE, no admin rights needed</div>
//                     </div>
//                     <Button
//                       onClick={() =>
//                         handleDownload(WINDOWS_URL, "AI_Tech_Repairer_Windows.zip")
//                       }
//                       variant="default"
//                       className="bg-blue-600 hover:bg-blue-700 text-white shrink-0"
//                     >
//                       <Download className="w-4 h-4 mr-2" />
//                       Download for Windows
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>

//             {/* Usage instructions */}
//             <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border/50">
//               <h3 className="font-semibold text-foreground mb-3">How to Run:</h3>
//               <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
//                 <li>Download the agent for your OS</li>
//                 <li>Extract the ZIP file</li>
//                 <li>Open terminal in the folder</li>
//                 <li>Make script executable: <code className="bg-muted px-1 rounded">chmod +x run.sh</code></li>
//                 <li>Run: <code className="bg-muted px-1 rounded">./run.sh</code></li>
//                 <li>Enter your 8-digit service token when prompted</li>
//               </ol>
//             </div>

//             <div className="mt-6 p-4 bg-yellow-50/50 border border-yellow-200 rounded-lg">
//               <p className="text-sm text-yellow-800">
//                 💡 No payment, we’ll email your service token within minutes.
//               </p>
//             </div>
//           </div>

//           {/* Right side - Image */}
//           <div className="relative">
//             <div className="relative group">
//               <img 
//                 src={downloadImage} 
//                 alt="Download AI Tech Repairer Agent for Linux and Windows" 
//                 className="w-full h-auto rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 tech-glow"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };


















































// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// // import { Download } from "lucide-react";
// // import downloadImage from "@/assets/download-agents.jpg";

// // export const DownloadSection = () => {
// //   return (
// //     <section className="py-20 bg-background relative overflow-hidden">
// //       {/* Background decoration */}
// //       <div className="absolute inset-0 overflow-hidden">
// //         <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/5 via-transparent to-accent/5"></div>
// //       </div>

// //       <div className="container mx-auto px-6 relative z-10">
// //         <div className="grid lg:grid-cols-2 gap-12 items-center">
// //           {/* Left side - Download options */}
// //           <div>
// //             <div className="text-center lg:text-left mb-12">
// //               <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
// //                 Download AI Tech Repairer Agent
// //               </h2>
// //               <p className="text-xl text-muted-foreground leading-relaxed">
// //                 Fix software issues automatically — no installation needed. Just download and run.
// //               </p>
// //             </div>

// //             <div className="grid gap-6">
// //               {/* Linux Agent */}
// //               <Card className="tech-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
// //                 <CardHeader className="pb-4">
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-teal-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
// //                       <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
// //                       </svg>
// //                     </div>
// //                     <div>
// //                       <CardTitle className="text-xl font-semibold">Linux Agent</CardTitle>
// //                       <CardDescription>Ubuntu, Debian, Fedora, Mint & more</CardDescription>
// //                     </div>
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
// //                     <div className="text-sm text-muted-foreground">
// //                       <div className="font-mono text-xs bg-muted/50 px-2 py-1 rounded mb-2">
// //                         AI_Tech_Repairer_Linux.zip
// //                       </div>
// //                       <div>Size: ~25MB • Includes run.sh, agent, and executor</div>
// //                     </div>
// //                     <a
// //                       href="https://github.com/Boluex/techfix-frontend/releases/download/v1.0.0/AI_Tech_Repairer_Agent_Linux.zip
// // "
// //                       download
// //                     >
// //                       <Button variant="default" className="bg-teal-600 hover:bg-teal-700 text-white shrink-0">
// //                         <Download className="w-4 h-4 mr-2" />
// //                         Download for Linux
// //                       </Button>
// //                     </a>
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               {/* Windows Agent */}
// //               <Card className="tech-card border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group">
// //                 <CardHeader className="pb-4">
// //                   <div className="flex items-center gap-4">
// //                     <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500/20 to-blue-600/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
// //                       <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.676-2.154-1.415-3.414l5-5A2 2 0 008 9.172V4z" />
// //                       </svg>
// //                     </div>
// //                     <div>
// //                       <CardTitle className="text-xl font-semibold">Windows Agent</CardTitle>
// //                       <CardDescription>Windows 10 / 11 (64-bit)</CardDescription>
// //                     </div>
// //                   </div>
// //                 </CardHeader>
// //                 <CardContent>
// //                   <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
// //                     <div className="text-sm text-muted-foreground">
// //                       <div className="font-mono text-xs bg-muted/50 px-2 py-1 rounded mb-2">
// //                         AI_Tech_Repairer_Windows.zip
// //                       </div>
// //                       <div>Size: ~28MB • Portable EXE, no admin rights needed</div>
// //                     </div>
// //                     <a
// //                       href="https://github.com/Boluex/techfix-frontend/releases/download/v1.0.0/TechFixAgent.zip
// // "
// //                       download
// //                     >
// //                       <Button variant="default" className="bg-blue-600 hover:bg-blue-700 text-white shrink-0">
// //                         <Download className="w-4 h-4 mr-2" />
// //                         Download for Windows
// //                       </Button>
// //                     </a>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </div>

// //             {/* Usage instructions */}
// //             <div className="mt-8 p-6 bg-muted/30 rounded-xl border border-border/50">
// //               <h3 className="font-semibold text-foreground mb-3">How to Run:</h3>
// //               <ol className="text-sm text-muted-foreground space-y-2 list-decimal list-inside">
// //                 <li>Download the agent for your OS</li>
// //                 <li>Extract the ZIP file</li>
// //                 <li>Open terminal in the folder</li>
// //                 <li>Make script executable: <code className="bg-muted px-1 rounded">chmod +x run.sh</code></li>
// //                 <li>Run: <code className="bg-muted px-1 rounded">./run.sh</code></li>
// //                 <li>Enter your 8-digit service token when prompted</li>
// //               </ol>
// //             </div>

// //             <div className="mt-6 p-4 bg-yellow-50/50 border border-yellow-200 rounded-lg">
// //               <p className="text-sm text-yellow-800">
// //                 💡 No payment, we’ll email your service token within minutes.
// //               </p>
// //             </div>
// //           </div>

// //           {/* Right side - Image */}
// //           <div className="relative">
// //             <div className="relative group">
// //               <img 
// //                 src={downloadImage} 
// //                 alt="Download AI Tech Repairer Agent for Linux and Windows" 
// //                 className="w-full h-auto rounded-2xl shadow-2xl group-hover:shadow-3xl transition-all duration-300 tech-glow"
// //               />
// //               <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent rounded-2xl"></div>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // };

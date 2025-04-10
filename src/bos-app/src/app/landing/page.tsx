import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Button from '../../components/ui/Button';

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section */}
      <header className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <div className="text-2xl font-bold">Bible Operating System</div>
          <nav className="hidden md:flex space-x-6">
            <a href="#features" className="hover:text-blue-200">Features</a>
            <a href="#testimonials" className="hover:text-blue-200">Testimonials</a>
            <a href="#faq" className="hover:text-blue-200">FAQ</a>
            <Link href="/help" className="hover:text-blue-200">Help</Link>
          </nav>
          <div>
            <Link href="/bible">
              <Button variant="primary">Start Reading</Button>
            </Link>
          </div>
        </div>
        
        <div className="container mx-auto px-4 py-20 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Discover the Word of God Like Never Before</h1>
            <p className="text-xl mb-8">
              Bible Operating System (BOS) is a comprehensive web application for Evangelical Christians to engage with the King James Version of the Bible.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/bible">
                <Button variant="primary" size="lg">Start Reading</Button>
              </Link>
              <Link href="/help/getting-started">
                <Button variant="outline" size="lg">Learn More</Button>
              </Link>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="bg-white rounded-lg shadow-xl overflow-hidden w-full max-w-md">
              <div className="bg-blue-800 p-4 text-white text-center">
                <h3 className="text-xl font-semibold">King James Bible</h3>
              </div>
              <div className="p-6 text-gray-800">
                <p className="text-center italic mb-4">
                  "For God so loved the world, that he gave his only begotten Son, that whosoever believeth in him should not perish, but have everlasting life."
                </p>
                <p className="text-right font-semibold">John 3:16</p>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">King James Bible</h3>
              <p className="text-gray-600">
                Access the complete King James Version of the Bible with intuitive navigation, search, and bookmarking features.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Study Tools</h3>
              <p className="text-gray-600">
                Enhance your Bible study with AI tools for verse analysis, thematic exploration, and historical context, all verified for biblical accuracy.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Christian Community</h3>
              <p className="text-gray-600">
                Connect with other believers through discussion forums, study groups, and prayer requests. Share insights with your Facebook groups.
              </p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Biblical Accuracy</h3>
              <p className="text-gray-600">
                All content is verified for biblical accuracy against the King James Version Bible. Our AI content verification system provides accuracy scores and identifies supporting verses.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="text-blue-600 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Facebook Integration</h3>
              <p className="text-gray-600">
                Seamlessly connect with Facebook groups to share Bible studies, insights, and prayer requests with your existing Christian communities.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-blue-800 text-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">What Users Are Saying</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-blue-900 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">J</span>
                </div>
                <div>
                  <h3 className="font-semibold">John D.</h3>
                  <p className="text-blue-300 text-sm">Bible Study Leader</p>
                </div>
              </div>
              <p className="italic">
                "BOS has transformed our Bible study group. The AI-powered tools provide insights that would have taken hours of research to discover."
              </p>
            </div>
            
            <div className="bg-blue-900 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">S</span>
                </div>
                <div>
                  <h3 className="font-semibold">Sarah M.</h3>
                  <p className="text-blue-300 text-sm">Sunday School Teacher</p>
                </div>
              </div>
              <p className="italic">
                "I love how easy it is to find and share verses with my students. The content verification feature ensures I'm teaching accurate biblical principles."
              </p>
            </div>
            
            <div className="bg-blue-900 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-blue-700 rounded-full flex items-center justify-center mr-4">
                  <span className="text-xl font-bold">R</span>
                </div>
                <div>
                  <h3 className="font-semibold">Robert T.</h3>
                  <p className="text-blue-300 text-sm">Pastor</p>
                </div>
              </div>
              <p className="italic">
                "The community features have connected our church members in new ways. We're able to continue discussions throughout the week, not just on Sundays."
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* FAQ Section */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">What Bible version does BOS use?</h3>
              <p className="text-gray-600">
                BOS exclusively uses the King James Version (KJV) of the Bible, which is widely respected for its accuracy and historical significance.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Is BOS free to use?</h3>
              <p className="text-gray-600">
                Yes, BOS is completely free to use. We believe in making Bible study tools accessible to everyone.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">How does the AI content verification work?</h3>
              <p className="text-gray-600">
                Our AI content verification system cross-references all AI-generated content with the King James Bible to ensure biblical accuracy. It provides accuracy scores and identifies supporting and contradicting verses.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">Can I use BOS on my mobile device?</h3>
              <p className="text-gray-600">
                Yes, BOS is fully responsive and works on all devices, including smartphones and tablets. You can access all features from any device with a web browser.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-2">How do I connect BOS with my Facebook groups?</h3>
              <p className="text-gray-600">
                After creating an account, visit the Community page and click on "Connect with Facebook." You'll be prompted to authorize BOS to access your Facebook groups. Once connected, you can share content directly to your groups.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-blue-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Start Your Bible Journey Today</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of believers who are deepening their understanding of God's Word through the Bible Operating System.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/bible">
              <Button variant="primary" size="lg">Start Reading</Button>
            </Link>
            <Link href="/help/getting-started">
              <Button variant="outline" size="lg">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Bible Operating System</h3>
              <p className="text-gray-400">
                A comprehensive web application for Evangelical Christians to engage with the King James Version of the Bible.
              </p>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#features" className="hover:text-white">Bible Reading</a></li>
                <li><a href="#features" className="hover:text-white">AI Study Tools</a></li>
                <li><a href="#features" className="hover:text-white">Community</a></li>
                <li><a href="#features" className="hover:text-white">Facebook Integration</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Resources</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
                <li><Link href="/help/getting-started" className="hover:text-white">Getting Started</Link></li>
                <li><Link href="/community/guidelines" className="hover:text-white">Community Guidelines</Link></li>
                <li><Link href="/help/contact" className="hover:text-white">Contact Support</Link></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/terms" className="hover:text-white">Terms of Service</Link></li>
                <li><Link href="/cookies" className="hover:text-white">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} Bible Operating System. All rights reserved.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="#" className="text-gray-400 hover:text-white">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

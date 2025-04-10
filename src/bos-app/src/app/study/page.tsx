import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';

export default function StudyPage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">Bible Study Tools</h1>
        
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">AI-Powered Analysis</h2>
            <p className="text-gray-600 mb-4">
              Get AI-generated insights and analysis for any Bible passage, verified for biblical accuracy.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Bible Reference
              </label>
              <input 
                type="text" 
                placeholder="e.g., John 3:16" 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <Button variant="primary">Analyze Passage</Button>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Thematic Study</h2>
            <p className="text-gray-600 mb-4">
              Explore biblical themes and topics with AI-assisted research.
            </p>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Enter Theme or Topic
              </label>
              <input 
                type="text" 
                placeholder="e.g., Faith, Love, Salvation" 
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <Button variant="primary">Explore Theme</Button>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <h2 className="text-xl font-semibold mb-3">Recent Studies</h2>
          <div className="space-y-3">
            <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
              <h3 className="font-medium">John 3:16-21</h3>
              <p className="text-sm text-gray-600">Analysis of God's love and salvation</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
              <h3 className="font-medium">Psalm 23</h3>
              <p className="text-sm text-gray-600">The Lord as our shepherd</p>
            </div>
            <div className="p-3 border border-gray-200 rounded-md hover:bg-gray-50">
              <h3 className="font-medium">Faith in the Bible</h3>
              <p className="text-sm text-gray-600">Thematic study on faith</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-3">Content Verification</h2>
          <p className="text-gray-700 mb-4">
            All AI-generated content is verified for biblical accuracy by cross-referencing with the King James Version Bible.
          </p>
          <Button variant="secondary">Learn More About Our Verification Process</Button>
        </div>
      </div>
    </MainLayout>
  );
}

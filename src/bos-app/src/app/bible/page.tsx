import React from 'react';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';

export default function BiblePage() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6">King James Bible</h1>
        
        <div className="flex flex-col md:flex-row gap-6 mb-8">
          <div className="w-full md:w-1/3 bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Books</h2>
            <div className="space-y-2">
              <div className="p-2 bg-blue-50 rounded cursor-pointer hover:bg-blue-100">Genesis</div>
              <div className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-100">Exodus</div>
              <div className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-100">Leviticus</div>
              <div className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-100">Numbers</div>
              <div className="p-2 bg-gray-50 rounded cursor-pointer hover:bg-blue-100">Deuteronomy</div>
            </div>
          </div>
          
          <div className="w-full md:w-2/3 bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Genesis 1</h2>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Previous</Button>
                <Button variant="outline" size="sm">Next</Button>
              </div>
            </div>
            
            <div className="prose max-w-none">
              <p><sup>1</sup> In the beginning God created the heaven and the earth.</p>
              <p><sup>2</sup> And the earth was without form, and void; and darkness was upon the face of the deep. And the Spirit of God moved upon the face of the waters.</p>
              <p><sup>3</sup> And God said, Let there be light: and there was light.</p>
              <p><sup>4</sup> And God saw the light, that it was good: and God divided the light from the darkness.</p>
              <p><sup>5</sup> And God called the light Day, and the darkness he called Night. And the evening and the morning were the first day.</p>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Study Tools</h2>
          <p className="text-gray-700 mb-4">
            Use our AI-powered study tools to gain deeper insights into the scripture.
          </p>
          <div className="flex gap-3">
            <Button variant="primary" size="sm">Analyze Passage</Button>
            <Button variant="secondary" size="sm">Cross References</Button>
            <Button variant="outline" size="sm">Share</Button>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}

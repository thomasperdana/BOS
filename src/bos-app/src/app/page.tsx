import Image from "next/image";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";

export default function Home() {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto py-8">
        <section className="mb-12 text-center">
          <h1 className="text-4xl font-bold mb-4">Bible Operating System</h1>
          <p className="text-xl text-gray-600 mb-8">
            A comprehensive web application for Evangelical Christians to engage with the King James Version of the Bible
          </p>
          <div className="flex gap-4 justify-center">
            <Button variant="primary" size="lg">
              Start Reading
            </Button>
            <Button variant="outline" size="lg">
              Learn More
            </Button>
          </div>
        </section>

        <section className="grid md:grid-cols-3 gap-8 mb-12">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Bible Reading</h2>
            <p className="text-gray-600 mb-4">
              Access the King James Bible with an intuitive reading interface
            </p>
            <Button variant="secondary" size="sm">
              Open Bible
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">AI-powered Study</h2>
            <p className="text-gray-600 mb-4">
              Enhanced Bible study experience with AI tools and verification
            </p>
            <Button variant="secondary" size="sm">
              Study Tools
            </Button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-3">Community</h2>
            <p className="text-gray-600 mb-4">
              Connect with Facebook groups and other believers
            </p>
            <Button variant="secondary" size="sm">
              Join Community
            </Button>
          </div>
        </section>

        <section className="bg-blue-50 p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4 text-center">About BOS</h2>
          <p className="text-gray-700 mb-4">
            The Bible Operating System (BOS) is designed to help believers connect with God and other Christians while growing in faith. Our focus is on biblical accuracy and community engagement.
          </p>
          <p className="text-gray-700">
            All content is verified for biblical accuracy by cross-referencing with the King James Version Bible.
          </p>
        </section>
      </div>
    </MainLayout>
  );
}

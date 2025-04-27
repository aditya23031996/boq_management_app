import PageLayout from "../components/PageLayout";
import { Link } from "react-router-dom";
import { Rocket, DollarSign, LayoutDashboard } from "lucide-react"; // Icons
import { motion } from "framer-motion"; // Animation

export default function Homepage() {
  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-indigo-100 to-white py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h1 className="text-5xl font-extrabold text-indigo-700 mb-6 leading-tight">
            Manage Your BoQ Effortlessly
          </h1>
          <p className="text-gray-600 text-lg mb-8">
            Create, track, and generate project bills faster than ever before.
            Simplify your construction workflow with BoQ Management App.
          </p>

          <Link
            to="/login"
            className="inline-block bg-indigo-600 text-white text-lg font-semibold px-8 py-3 rounded-full shadow hover:bg-indigo-700 hover:scale-105 transition-transform"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-indigo-700 mb-12">
            Why Choose Us?
          </h2>

          <div className="grid gap-8 grid-cols-1 md:grid-cols-3">
            {/* Feature 1 */}
            <motion.div
              className="p-6 border rounded-lg shadow hover:shadow-lg transition"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.5 }}
            >
              <Rocket className="mx-auto mb-4 text-indigo-600" size={48} />
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                Fast Setup
              </h3>
              <p className="text-gray-600">
                Get started in minutes. Upload your BoQ and manage tasks easily.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              className="p-6 border rounded-lg shadow hover:shadow-lg transition"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.6 }}
            >
              <DollarSign className="mx-auto mb-4 text-indigo-600" size={48} />
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                Flexible Billing
              </h3>
              <p className="text-gray-600">
                Split payments, manage breakups, and generate bills on project milestones.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              className="p-6 border rounded-lg shadow hover:shadow-lg transition"
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 50 }}
              transition={{ duration: 0.7 }}
            >
              <LayoutDashboard className="mx-auto mb-4 text-indigo-600" size={48} />
              <h3 className="text-2xl font-semibold text-indigo-600 mb-4">
                Powerful Dashboard
              </h3>
              <p className="text-gray-600">
                Track progress, billing, and work completions — all from one dashboard.
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </PageLayout>
  );
}

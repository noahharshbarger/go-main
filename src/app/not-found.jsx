import Link from 'next/link'

export default function NotFound() {
    return (
    <main className="min-h-screen flex flex-col items-center justify-center">
        <div className="text-3xl text-center p-8">☀️</div>
            <h1 className="text-4xl font-bold mb-4">
                404-Page Not Found
            </h1>
            <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                That page you&apos;re looking for doesn&apos;t exist.
            </p>

            <div className="space-y-4">
                <Link
                    href="/"
                    className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors">
                        Back to home
                    </Link>
                    </div>
    </main>
    )
}
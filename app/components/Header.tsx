import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full py-4 bg-blue-600 text-white">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">SCL-90 心理健康自评量表</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:underline">首页</Link>
            </li>
            <li>
              <Link href="/test" className="hover:underline">开始测试</Link>
            </li>
            <li>
              <Link href="/about" className="hover:underline">关于量表</Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

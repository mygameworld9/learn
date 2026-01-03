'use client';

import { IconType } from 'react-icons';
import {
  FaRobot,
  FaServer,
  FaCloud,
  FaDatabase,
  FaCode,
  FaBook,
  FaCog,
  FaTools,
  FaLightbulb,
  FaBrain,
  FaNetworkWired,
  FaLock,
  FaChartLine,
  FaTerminal,
  FaMicrochip,
  FaProjectDiagram,
  FaExternalLinkAlt,
} from 'react-icons/fa';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiReact,
  SiNextdotjs,
  SiDocker,
  SiKubernetes,
  SiGooglecloud,
  SiAmazonwebservices,
  SiRabbitmq,
  SiApachekafka,
  SiGraphql,
  SiMongodb,
  SiPostgresql,
  SiRedis,
  SiTerraform,
} from 'react-icons/si';

import { LearningCard as LearningCardType } from '@/types';
import FlipCard from './FlipCard';

interface LearningCardProps {
  learning: LearningCardType;
}

/**
 * 图标名称到 react-icons 组件的映射
 * 支持 react-icons 的 Fa 和 Si 图标库
 */
const iconMap: Record<string, IconType> = {
  // FontAwesome icons
  FaRobot: FaRobot,
  FaServer: FaServer,
  FaCloud: FaCloud,
  FaDatabase: FaDatabase,
  FaCode: FaCode,
  FaBook: FaBook,
  FaCog: FaCog,
  FaTools: FaTools,
  FaLightbulb: FaLightbulb,
  FaBrain: FaBrain,
  FaNetworkWired: FaNetworkWired,
  FaLock: FaLock,
  FaChartLine: FaChartLine,
  FaTerminal: FaTerminal,
  FaMicrochip: FaMicrochip,
  FaProjectDiagram: FaProjectDiagram,

  // Simple Icons (tech-specific)
  SiTypescript: SiTypescript,
  SiJavascript: SiJavascript,
  SiPython: SiPython,
  SiReact: SiReact,
  SiNextdotjs: SiNextdotjs,
  SiDocker: SiDocker,
  SiKubernetes: SiKubernetes,
  SiGooglecloud: SiGooglecloud,
  SiAmazonwebservices: SiAmazonwebservices,
  SiRabbitmq: SiRabbitmq,
  SiApachekafka: SiApachekafka,
  SiGraphql: SiGraphql,
  SiMongodb: SiMongodb,
  SiPostgresql: SiPostgresql,
  SiRedis: SiRedis,
  SiTerraform: SiTerraform,
};

/**
 * 根据图标名称获取对应的图标组件
 * @param iconName 图标名称（如 "FaRobot", "SiPython"）
 * @returns 对应的图标组件，未找到则返回默认图标
 */
function getIconComponent(iconName: string): IconType {
  return iconMap[iconName] || FaCode;
}

/**
 * 根据分类获取对应的颜色样式
 * @param category 分类名称
 * @returns Tailwind 颜色类名
 */
function getCategoryColor(category: string): string {
  const colorMap: Record<string, string> = {
    'AI Architecture': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    'AI/Agent': 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    Middleware: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    Backend: 'bg-green-500/20 text-green-300 border-green-500/30',
    Frontend: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/30',
    DevOps: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    Database: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
    Security: 'bg-red-500/20 text-red-300 border-red-500/30',
    Other: 'bg-gray-500/20 text-gray-300 border-gray-500/30',
  };

  return colorMap[category] || colorMap['Other'];
}

/**
 * LearningCard - 学习卡片组件
 *
 * 基于 FlipCard 封装，用于展示学习笔记/知识点
 * - 正面: 图标、主题名称、分类标签
 * - 背面: 摘要、知识点列表、可选链接
 */
export default function LearningCard({ learning }: LearningCardProps) {
  const Icon = getIconComponent(learning.icon);
  const categoryColorClass = getCategoryColor(learning.category);

  // 正面内容
  const frontContent = (
    <div className="flex flex-col items-center justify-center h-full p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl border border-slate-700 hover:border-slate-600 transition-colors">
      {/* 图标 */}
      <div className="mb-4 p-4 rounded-full bg-slate-700/50">
        <Icon size={48} className="text-slate-200" aria-hidden="true" />
      </div>

      {/* 主题名称 */}
      <h3 className="text-lg font-semibold text-slate-100 text-center mb-3">
        {learning.topic}
      </h3>

      {/* 分类标签 */}
      <span
        className={`px-3 py-1 text-xs font-medium rounded-full border ${categoryColorClass}`}
      >
        {learning.category}
      </span>

      {/* 点击提示 */}
      <p className="mt-4 text-xs text-slate-500">Click to see details</p>
    </div>
  );

  // 背面内容
  const backContent = (
    <div className="flex flex-col h-full p-6 bg-gradient-to-br from-slate-900 to-slate-950 rounded-xl border border-slate-600 overflow-hidden">
      {/* 摘要 */}
      <p className="text-sm text-slate-300 mb-4 leading-relaxed">
        {learning.summary}
      </p>

      {/* 知识点列表 */}
      {learning.details && learning.details.length > 0 && (
        <ul className="flex-1 space-y-2 overflow-y-auto mb-4">
          {learning.details.map((detail, index) => (
            <li
              key={index}
              className="flex items-start gap-2 text-sm text-slate-400"
            >
              <span className="text-slate-500 mt-0.5" aria-hidden="true">
                &#8226;
              </span>
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}

      {/* 链接按钮 */}
      {learning.link && (
        <a
          href={learning.link}
          target={learning.link.startsWith('http') ? '_blank' : undefined}
          rel={learning.link.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="inline-flex items-center justify-center gap-2 px-4 py-2 mt-auto text-sm font-medium text-slate-100 bg-slate-700 hover:bg-slate-600 rounded-lg transition-colors"
          onClick={(e) => e.stopPropagation()}
        >
          View Notes
          <FaExternalLinkAlt size={12} aria-hidden="true" />
        </a>
      )}
    </div>
  );

  return (
    <FlipCard
      front={frontContent}
      back={backContent}
      className="w-full h-[280px]"
      aria-label={`Learning card: ${learning.topic}. ${learning.summary}`}
    />
  );
}

/**
 * 导出图标映射，供外部使用
 */
export { iconMap, getIconComponent, getCategoryColor };

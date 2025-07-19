import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// 简单的模板引擎，支持条件性代码生成
export function renderTemplate(template: string, vars: Record<string, string>): string {
  let result = template;
  
  // 处理条件语句 {{#if variable}}...{{/if}}
  // 只有当变量有值且不为空字符串时才包含内容
  const ifRegex = /\{\{#if\s+(\w+)\}\}(.*?)\{\{\/if\}\}/gs;
  result = result.replace(ifRegex, (match, variable, content) => {
    const value = vars[variable];
    if (value && value.trim() !== '') {
      // 递归处理嵌套的条件语句
      return renderTemplate(content, vars);
    }
    return '';
  });
  
  // 处理变量替换 {{variable}}
  // 只有当变量有值时才进行替换
  Object.entries(vars).forEach(([key, value]) => {
    if (value && value.trim() !== '') {
      result = result.replaceAll(`{{${key}}}`, value);
    }
  });
  
  // 清理多余的空行和空白字符
  result = result.replace(/\n\s*\n/g, '\n').trim();
  
  return result;
}

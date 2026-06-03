export interface LinkItem {
  id: string;
  name: string;
  url: string;
  description: string;
  icon: string;
}

export const links: LinkItem[] = [
  {
    id: "github",
    name: "GitHub",
    url: "https://github.com/ConradZhangcong/",
    description: "开源项目与代码",
    icon: "github",
  },
  {
    id: "juejin",
    name: "Juejin",
    url: "https://juejin.cn/user/395479916507422/",
    description: "技术博客文章",
    icon: "juejin",
  },
  {
    id: "linuxdo",
    name: "LinuxDo",
    url: "https://linux.do/",
    description: "社区交流",
    icon: "linuxdo",
  },
  {
    id: "email",
    name: "Email",
    url: "mailto:heisenberg0519@outlook.com",
    description: "邮件联系",
    icon: "email",
  },
];

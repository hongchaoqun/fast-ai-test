import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, ArrowRight, Code, Database, Lock, Zap, Globe, BarChart } from "lucide-react"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">API</span>
              </div>
              <span className="font-bold text-xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                APIManager
              </span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link href="#features" className="text-sm font-medium hover:text-primary">
              功能
            </Link>
            <Link href="#pricing" className="text-sm font-medium hover:text-primary">
              价格
            </Link>
            <Link href="#testimonials" className="text-sm font-medium hover:text-primary">
              客户评价
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:text-primary">
              常见问题
            </Link>
          </nav>
          <div className="flex items-center gap-2">
            <Link href="/login">
              <Button variant="ghost" className="rounded-full">
                登录
              </Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full">免费注册</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28 bg-gradient-to-b from-background to-muted/20">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Badge className="rounded-full px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20 border-none">
                全新发布 v1.0
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter max-w-3xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary/70">
                更智能的API管理工具
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl max-w-[700px]">
                简化您的API开发流程，提高团队协作效率，让API管理变得轻松愉快。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link href="/register">
                  <Button size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all">
                    开始免费试用
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/projects/demo">
                  <Button size="lg" variant="outline" className="rounded-full">
                    查看演示
                  </Button>
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative mx-auto max-w-5xl rounded-xl border bg-background p-2 shadow-xl">
              <div className="rounded-lg overflow-hidden border shadow-sm">
                <img src="/placeholder.svg?height=600&width=1200" alt="API管理工具界面预览" className="w-full h-auto" />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-primary text-primary-foreground px-4 py-2 rounded-lg shadow-lg text-sm font-medium">
                简单易用的界面设计
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Badge className="rounded-full px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20 border-none">
                强大功能
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">为开发者打造的完整解决方案</h2>
              <p className="text-muted-foreground text-lg max-w-[700px]">
                我们的API管理工具提供了您所需的一切功能，帮助您更高效地管理API。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  icon: Code,
                  title: "API设计与文档",
                  description: "直观的界面帮助您设计API并自动生成详细文档，支持OpenAPI和Swagger规范。",
                },
                {
                  icon: Database,
                  title: "多环境管理",
                  description: "轻松管理开发、测试和生产环境，确保API在各个环境中的一致性。",
                },
                {
                  icon: Lock,
                  title: "安全认证",
                  description: "内置多种认证方式，包括API密钥、OAuth 2.0和JWT，保障您的API安全。",
                },
                {
                  icon: Zap,
                  title: "实时测试",
                  description: "在界面中直接测试API请求，查看响应结果，快速调试问题。",
                },
                {
                  icon: Globe,
                  title: "团队协作",
                  description: "多人协作功能让团队成员可以同时处理不同的API，提高开发效率。",
                },
                {
                  icon: BarChart,
                  title: "性能监控",
                  description: "实时监控API调用情况，分析性能瓶颈，优化API响应时间。",
                },
              ].map((feature, index) => (
                <Card key={index} className="border-none shadow-md hover:shadow-lg transition-all duration-200">
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <div className="p-2 rounded-full bg-primary/10">
                        <feature.icon className="h-5 w-5 text-primary" />
                      </div>
                      <CardTitle>{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Badge className="rounded-full px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20 border-none">
                简单易用
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">如何使用我们的API管理工具</h2>
              <p className="text-muted-foreground text-lg max-w-[700px]">
                只需几个简单步骤，即可开始使用我们的API管理工具。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  step: "01",
                  title: "创建项目",
                  description: "注册账号后创建您的第一个API项目，设置基本信息和环境配置。",
                },
                {
                  step: "02",
                  title: "设计API",
                  description: "使用直观的界面设计API端点，定义请求参数、响应格式和认证方式。",
                },
                {
                  step: "03",
                  title: "测试与发布",
                  description: "在平台上测试您的API，确认无误后一键发布，与团队成员共享。",
                },
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-6">
                    <span className="text-xl font-bold text-primary">{step.step}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Badge className="rounded-full px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20 border-none">
                客户评价
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">用户们怎么说</h2>
              <p className="text-muted-foreground text-lg max-w-[700px]">
                来自各行各业的开发者都在使用我们的API管理工具，听听他们的反馈。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
              {[
                {
                  quote: "这是我用过的最直观、最易用的API管理工具，大大提高了我们团队的开发效率。",
                  author: "李明",
                  title: "技术总监，科技有限公司",
                },
                {
                  quote: "多环境管理功能非常实用，让我们可以无缝地在开发、测试和生产环境之间切换。",
                  author: "张华",
                  title: "后端开发，互联网公司",
                },
                {
                  quote: "团队协作功能帮助我们解决了多人同时开发API的问题，版本控制也非常方便。",
                  author: "王芳",
                  title: "项目经理，电商平台",
                },
                {
                  quote: "API文档自动生成功能节省了我们大量时间，客户也很喜欢清晰的文档格式。",
                  author: "赵强",
                  title: "全栈开发，创业公司",
                },
                {
                  quote: "安全认证选项丰富，满足了我们对API安全性的所有要求，非常推荐。",
                  author: "刘洋",
                  title: "安全工程师，金融科技",
                },
                {
                  quote: "性能监控功能帮助我们及时发现并解决了API性能瓶颈，用户体验大幅提升。",
                  author: "陈静",
                  title: "DevOps工程师，游戏公司",
                },
              ].map((testimonial, index) => (
                <Card key={index} className="border shadow-sm hover:shadow-md transition-all duration-200">
                  <CardContent className="pt-6">
                    <div className="flex flex-col gap-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <svg
                            key={star}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="w-5 h-5 text-primary"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ))}
                      </div>
                      <p className="text-muted-foreground italic">"{testimonial.quote}"</p>
                      <div>
                        <p className="font-medium">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">{testimonial.title}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-20 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Badge className="rounded-full px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20 border-none">
                价格方案
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">选择适合您的方案</h2>
              <p className="text-muted-foreground text-lg max-w-[700px]">
                我们提供灵活的价格方案，满足不同规模团队的需求。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              {[
                {
                  name: "免费版",
                  price: "¥0",
                  description: "适合个人开发者和小型项目",
                  features: ["最多3个API项目", "基础API设计功能", "标准文档生成", "单一环境管理", "社区支持"],
                  cta: "开始使用",
                  popular: false,
                },
                {
                  name: "专业版",
                  price: "¥199",
                  period: "/月",
                  description: "适合专业团队和中型项目",
                  features: [
                    "无限API项目",
                    "高级API设计功能",
                    "自定义文档模板",
                    "多环境管理",
                    "团队协作功能",
                    "优先电子邮件支持",
                    "API版本控制",
                  ],
                  cta: "开始14天免费试用",
                  popular: true,
                },
                {
                  name: "企业版",
                  price: "定制",
                  description: "适合大型企业和复杂项目",
                  features: [
                    "专业版全部功能",
                    "专属部署选项",
                    "高级安全功能",
                    "自定义集成",
                    "SLA保障",
                    "专属客户经理",
                    "7x24小时技术支持",
                  ],
                  cta: "联系销售",
                  popular: false,
                },
              ].map((plan, index) => (
                <Card
                  key={index}
                  className={`border ${plan.popular ? "border-primary shadow-lg" : "shadow-md"} hover:shadow-lg transition-all duration-200 relative overflow-hidden`}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-primary text-primary-foreground px-3 py-1 text-xs font-medium">
                      最受欢迎
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-2xl">{plan.name}</CardTitle>
                    <div className="flex items-baseline mt-2">
                      <span className="text-3xl font-bold">{plan.price}</span>
                      {plan.period && <span className="text-muted-foreground ml-1">{plan.period}</span>}
                    </div>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-center">
                          <CheckCircle2 className="h-4 w-4 text-primary mr-2 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className={`w-full rounded-full ${plan.popular ? "" : "bg-primary/10 text-primary hover:bg-primary/20"}`}
                      variant={plan.popular ? "default" : "outline"}
                    >
                      {plan.cta}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4 mb-12">
              <Badge className="rounded-full px-4 py-1 bg-primary/10 text-primary hover:bg-primary/20 border-none">
                常见问题
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">您可能想知道</h2>
              <p className="text-muted-foreground text-lg max-w-[700px]">
                以下是我们最常被问到的一些问题。如果您有其他疑问，请随时联系我们。
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-12 max-w-4xl mx-auto">
              {[
                {
                  question: "API管理工具适合哪些类型的团队？",
                  answer:
                    "我们的API管理工具适合各种规模的团队，从个人开发者到大型企业。无论您是构建内部API还是面向公众的API，我们的工具都能满足您的需求。",
                },
                {
                  question: "是否支持导入现有的API文档？",
                  answer:
                    "是的，我们支持导入OpenAPI (Swagger)、Postman Collection等格式的API文档，让您可以轻松迁移现有的API项目。",
                },
                {
                  question: "如何保障API的安全性？",
                  answer:
                    "我们提供多种安全机制，包括API密钥、OAuth 2.0、JWT等认证方式，以及细粒度的访问控制和权限管理，确保您的API安全可靠。",
                },
                {
                  question: "是否提供API监控和分析功能？",
                  answer:
                    "是的，我们的专业版和企业版提供实时API监控和分析功能，帮助您了解API的使用情况、性能指标和潜在问题。",
                },
                {
                  question: "如何进行团队协作？",
                  answer:
                    "您可以邀请团队成员加入项目，分配不同的角色和权限，共同编辑和管理API。我们还提供版本控制和变更历史记录，方便团队协作。",
                },
                {
                  question: "是否提供自定义部署选项？",
                  answer:
                    "企业版客户可以选择私有云或本地部署选项，满足特定的安全和合规要求。请联系我们的销售团队了解更多详情。",
                },
              ].map((faq, index) => (
                <Card key={index} className="border shadow-sm hover:shadow-md transition-all duration-200">
                  <CardHeader>
                    <CardTitle className="text-lg">{faq.question}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{faq.answer}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary/5">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center space-y-4">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tighter">准备好开始使用了吗？</h2>
              <p className="text-muted-foreground text-lg max-w-[700px]">
                立即注册，免费体验我们的API管理工具，提升您的API开发效率。
              </p>
              <div className="flex flex-col sm:flex-row gap-3 mt-6">
                <Link href="/register">
                  <Button size="lg" className="rounded-full shadow-md hover:shadow-lg transition-all">
                    免费注册
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button size="lg" variant="outline" className="rounded-full">
                    联系我们
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-background">
        <div className="container px-4 md:px-6 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
                  <span className="text-primary-foreground font-bold">API</span>
                </div>
                <span className="font-bold text-xl">APIManager</span>
              </div>
              <p className="text-muted-foreground">简化API管理，提升开发效率</p>
              <div className="flex space-x-4">
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect width="4" height="12" x="2" y="9"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </Link>
                <Link href="#" className="text-muted-foreground hover:text-primary">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="font-medium mb-4">产品</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    功能
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    价格
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    案例研究
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    文档
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">公司</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    关于我们
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    博客
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    招聘
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    联系我们
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium mb-4">支持</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    帮助中心
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    社区
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    状态
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-primary">
                    API状态
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">© 2023 APIManager. 保留所有权利。</p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                隐私政策
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                服务条款
              </Link>
              <Link href="#" className="text-sm text-muted-foreground hover:text-primary">
                Cookie政策
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}


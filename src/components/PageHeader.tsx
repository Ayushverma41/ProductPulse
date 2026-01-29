type PageHeaderProps = {
  title: string;
  subtitle?: string;
};

const PageHeader = ({ title, subtitle }: PageHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="text-4xl font-headline font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
        {title}
      </h1>
      {subtitle && <p className="text-muted-foreground mt-2">{subtitle}</p>}
    </div>
  );
};

export default PageHeader;

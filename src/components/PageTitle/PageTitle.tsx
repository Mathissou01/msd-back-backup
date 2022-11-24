import "./page-title.scss";

interface IPageTitleProps {
  title: string;
  description: string;
}

export default function PageTitle({ title, description }: IPageTitleProps) {
  return (
    <hgroup className="c-PageTitle">
      <h1 data-testid="title">{title}</h1>
      <p className="c-PageTitle__Description" data-testid="description">
        {description}
      </p>
    </hgroup>
  );
}

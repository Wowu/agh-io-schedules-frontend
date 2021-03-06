import { PageHeader, Row, Col, Typography } from 'antd';
interface CenteredHeaderProps {
  title: string;
  subtitle?: string;
}

export default function CenteredHeader(props: CenteredHeaderProps) {
  return (
    <Row justify={'center'} align="middle" style={{ flexDirection: 'column' }}>
      <PageHeader className="site-page-header" title={props.title} />
      {props.subtitle && <Typography.Paragraph>{props.subtitle}</Typography.Paragraph>}
    </Row>
  );
}

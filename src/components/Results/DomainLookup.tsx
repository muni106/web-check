import colors from 'styles/colors';
import { Card } from 'components/Form/Card';
import Row from 'components/Form/Row';
import { useTranslation } from 'react-i18next';

const cardStyles = `
span.val {
  &.up { color: ${colors.success}; }
  &.down { color: ${colors.danger}; }
}
`;

const DomainLookupCard = (props: { data: any, title: string, actionButtons: any }): JSX.Element => {
  const { t } = useTranslation();
  const domain = props.data.internicData || {};
  return (
    <Card heading={props.title} actionButtons={props.actionButtons} styles={cardStyles}>
      { domain.Domain_Name && <Row lbl={t('domain.registeredDomain')} val={domain.Domain_Name} /> }
      { domain.Creation_Date && <Row lbl={t('domain.creationDate')}  val={domain.Creation_Date} /> }
      { domain.Updated_Date && <Row lbl={t('domain.updatedDate')}  val={domain.Updated_Date} /> }
      { domain.Registry_Expiry_Date && <Row lbl={t('domain.registryExp')}  val={domain.Registry_Expiry_Date} /> }
      { domain.Registry_Domain_ID && <Row lbl={t('domain.registryDomain')}  val={domain.Registry_Domain_ID} /> }
      { domain.Registrar_WHOIS_Server && <Row lbl={t('domain.registrarWhoisServer')}  val={domain.Registrar_WHOIS_Server} /> }
      { domain.Registrar && <Row lbl="" val="">
        <span className="lbl">{t('domain.registrar')}</span>
        <span className="val"><a href={domain.Registrar_URL || '#'}>{domain.Registrar}</a></span>
      </Row> }
      { domain.Registrar_IANA_ID && <Row lbl={t('domain.registrarIanaID')} val={domain.Registrar_IANA_ID} /> }
    </Card>
  );
}

export default DomainLookupCard;

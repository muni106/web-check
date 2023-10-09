
import styled from 'styled-components';
import colors from 'styles/colors';
import { Card } from 'components/Form/Card';
import Heading from 'components/Form/Heading';
import { useTranslation } from 'react-i18next';
import i18next from 'i18next';

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.25rem;
  &:not(:last-child) { border-bottom: 1px solid ${colors.primary}; }
  span.lbl { font-weight: bold; }
  span.val {
    max-width: 200px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const formatter = new Intl.DateTimeFormat('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });
  return formatter.format(date);
}

const DataRow = (props: { lbl: string, val: string }) => {
  const { lbl, val } = props;
  return (
  <Row>
    <span className="lbl">{lbl}</span>
    <span className="val" title={val}>{val}</span>
  </Row>
  );
};


function getExtendedKeyUsage(oids: string[]) {
  const oidMap: { [key: string]: string } = {
    "1.3.6.1.5.5.7.3.1": i18next.t('ssl.serverauth'), 
    "1.3.6.1.5.5.7.3.2": i18next.t('ssl.clientauth'),
    "1.3.6.1.5.5.7.3.3": i18next.t('ssl.codeSigning'),
    "1.3.6.1.5.5.7.3.4": i18next.t('ssl.emailProtection'),
    "1.3.6.1.5.5.7.3.8": i18next.t('ssl.timestamp'),
    "1.3.6.1.5.5.7.3.9": i18next.t('ssl.ocsp'),
    "1.3.6.1.5.5.7.3.5": i18next.t('ssl.endsys'),
    "1.3.6.1.5.5.7.3.6": i18next.t('ssl.tunnel'),
    "1.3.6.1.5.5.7.3.7": i18next.t('ssl.userIPsec'),
    "1.3.6.1.5.5.8.2.2": i18next.t('ssl.ike'),
    "2.16.840.1.113730.4.1": i18next.t('ssl.netscapeCrypto'),
    "1.3.6.1.4.1.311.10.3.3": i18next.t('ssl.microsoftServerGatedCrypto'),
    "1.3.6.1.4.1.311.10.3.4": i18next.t('ssl.microsoftEncryptedFileSystem'),
    "1.3.6.1.4.1.311.20.2.2": i18next.t('ssl.microsoftSmartcardLogon'),
    "1.3.6.1.4.1.311.10.3.12": i18next.t('ssl.microsoftDocumentSigning'),
    "0.9.2342.19200300.100.1.3": i18next.t('ssl.emailAddress'),
  };
  const results = oids.map(oid => oidMap[oid] || oid);
  return results.filter((item, index) => results.indexOf(item) === index);
}


const ListRow = (props: { list: string[], title: string }) => {
  const { list, title } = props;
  return (
  <>
    <Heading as="h3" size="small" align="left" color={colors.primary}>{title}</Heading>
    { list.map((entry: string, index: number) => {
      return (
      <Row key={`${title.toLocaleLowerCase()}-${index}`}><span>{ entry }</span></Row>
      )}
    )}
  </>
);
}

const SslCertCard = (props: { data: any, title: string, actionButtons: any }): JSX.Element => {
  const { t } = useTranslation();
  const sslCert = props.data;
  const { subject, issuer, fingerprint, serialNumber, asn1Curve, nistCurve, valid_to, valid_from, ext_key_usage } = sslCert;
  return (
    <Card heading={props.title} actionButtons={props.actionButtons}>
      { subject && <DataRow lbl={t('ssl.subject')} val={subject?.CN} /> }
      { issuer?.O && <DataRow lbl={t('ssl.issuer')}  val={issuer.O} /> }
      { asn1Curve && <DataRow lbl={t('ssl.asn1curve')} val={asn1Curve} /> }
      { nistCurve && <DataRow lbl={t('ssl.nistcurve')} val={nistCurve} /> }
      { valid_to && <DataRow lbl={t('ssl.expires')} val={formatDate(valid_to)} /> }
      { valid_from && <DataRow lbl={t('ssl.renewed')} val={formatDate(valid_from)} /> }
      { serialNumber && <DataRow lbl={t('ssl.serial')} val={serialNumber} /> }
      { fingerprint && <DataRow lbl={t('ssl.fingerprint')} val={fingerprint} /> }
      { ext_key_usage && <ListRow title={t('ssl.subtitle')} list={getExtendedKeyUsage(ext_key_usage)} /> }
      
    </Card>
  );
}

export default SslCertCard;

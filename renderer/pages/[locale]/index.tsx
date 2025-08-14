import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import DefaultLayout from "@/components/layouts/Default";
import { Container, Stack } from "@mantine/core";
import { useTranslation } from "next-i18next";

const IndexPage = () => {
  const { t } = useTranslation();

  return (
    <DefaultLayout withNavbarOpen>
      <Container fluid>
        <Stack my="lg">{t("yes")}</Stack>
      </Container>
    </DefaultLayout>
  );
};

export default IndexPage;

export const getStaticProps = makeStaticProperties(["common"]);

export { getStaticPaths };

import { useTranslation } from "next-i18next";
import { getStaticPaths, makeStaticProperties } from "@/lib/getStatic";
import { Stack, Text, Title } from "@mantine/core";
import SettingsLayout from "@/components/layouts/SettingsLayout";

const SettingsPage = () => {
  const {
    t,
    // i18n: { language: locale },
  } = useTranslation();

  return (
    <SettingsLayout route="/">
      <Stack>
        <Title>{t("routes.profile")}</Title>
        <Text>{t("settings:profile.text")}</Text>
      </Stack>
    </SettingsLayout>
  );
};

export default SettingsPage;

export const getStaticProps = makeStaticProperties(["common", "settings"]);

export { getStaticPaths };

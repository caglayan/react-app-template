import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import TabPanel from "../HelperComponents/TabPanel";
import Container from "@material-ui/core/Container";
import { Divider, Avatar } from "@material-ui/core";
import InstStat from "../HelperComponents/InstStat";
import Comment from "../HelperComponents/Comment";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  bigAvatar: {
    margin: 10,
    width: 60,
    height: 60
  },
  avatar: {
    margin: 10
  }
}));

export default function CourseSection2() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Container className={classes.container} maxWidth="lg">
      <Grid container spacing={1}>
        <Grid item sm={8} xs={12}>
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            centered={false}
          >
            <Tab label="Açıklama" />
            <Tab label="Proje" />
            <Tab label="Yorumlar" />
          </Tabs>
          <TabPanel style={{ height: "300px" }} value={value} index={0}>
            <Typography variant="body1" component="h1">
              <Box fontWeight="fontWeightMedium">
                Python ile Veri Bilimi ve Makine Öğrenimi
              </Box>
            </Typography>
            <Typography variant="body2" component="h1">
              <Box style={{ marginTop: "10px" }} fontWeight="fontWeightMedium">
                Yaygın inancın tersine, Lorem Ipsum rastgele sözcüklerden
                oluşmaz. Kökleri M.Ö. 45 tarihinden bu yana klasik Latin
                edebiyatına kadar uzanan 2000 yıllık bir geçmişi vardır.
                Virginia'daki Hampden-Sydney College'dan Latince profesörü
                Richard McClintock, bir Lorem Ipsum pasajında geçen ve
                anlaşılması en güç sözcüklerden biri olan 'consectetur'
                sözcüğünün klasik edebiyattaki örneklerini incelediğinde kesin
                bir kaynağa ulaşmıştır. Lorm Ipsum, Çiçero tarafından M.Ö. 45
                tarihinde kaleme alınan "de Finibus Bonorum et Malorum" (İyi ve
                Kötünün Uç Sınırları) eserinin 1.10.32 ve 1.10.33 sayılı
                bölümlerinden gelmektedir. Bu kitap, ahlak kuramı üzerine bir
                tezdir ve Rönesans döneminde çok popüler olmuştur. Lorem Ipsum
                pasajının ilk satırı olan "Lorem ipsum dolor sit amet" 1.10.32
                sayılı bölümdeki bir satırdan gelmektedir.
              </Box>
              <Box style={{ marginTop: "10px" }}>
                1500'lerden beri kullanılmakta olan standard Lorem Ipsum
                metinleri ilgilenenler için yeniden üretilmiştir. Çiçero
                tarafından yazılan 1.10.32 ve 1.10.33 bölümleri de 1914 H.
                Rackham çevirisinden alınan İngilizce sürümleri eşliğinde özgün
                biçiminden yeniden üretilmiştir.
              </Box>
            </Typography>
          </TabPanel>
          <TabPanel style={{ height: "300px" }} value={value} index={1}>
            Item Two
          </TabPanel>
          <TabPanel style={{ height: "300px" }} value={value} index={2}>
            <Comment></Comment>
          </TabPanel>
        </Grid>
        <Grid item sm={4} xs={12}>
          <Button
            style={{ top: "4px", left: "30px",width:'100%' }}
            variant="contained"
            color="secondary"
            className={classes.button}
          >
            Şimdi Kayıt Ol : 20₺
          </Button>
          <Grid
            container
            justify="center"
            spacing={1}
            style={{ marginTop: "30px" }}
          >
            <Grid style={{ height: "50px" }} item sm={3} xs={12}>
              <InstStat></InstStat>
            </Grid>
            <Grid style={{ height: "50px" }} item sm={3} xs={12}>
              <InstStat></InstStat>
            </Grid>
            <Grid style={{ height: "50px" }} item sm={3} xs={12}>
              <InstStat></InstStat>
            </Grid>
          </Grid>
          <Divider style={{ marginTop: "30px" }} variant="middle" />
          <Grid container justify="center" alignItems="center" spacing={0}>
            <Grid item>
              <Avatar
                alt="Remy Sharp"
                className={classes.bigAvatar}
                src="https://experience.sap.com/fiori-design-web/wp-content/uploads/sites/5/2017/02/Avatar-Sizes-Custom-1.png"
              />
            </Grid>
            <Grid item>
              <Typography variant="body2">Mehmet Vahit Keskin</Typography>
              <Typography variant="body2">Data Scientist</Typography>
            </Grid>
            <Grid item xs={12}>
              <Box mx={4} my={1}>
                1500'lerden beri kullanılmakta olan standard Lorem Ipsum
                metinleri ilgilenenler için yeniden üretilmiştir. Çiçero
                tarafından yazılan 1.10.32 ve 1.10.33 bölümleri de 1914 H.
                Rackham çevirisinden alınan İngilizce sürümleri eşliğinde özgün
                biçiminden yeniden üretilmiştir.
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

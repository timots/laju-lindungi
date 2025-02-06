import React, { useEffect, useState } from 'react';
import CardSlider from '@/components/card/cardSlider';
import HeaderSlider from '@/components/card/headerSlider';
import CardList from '@/components/card/cardList';
import Header from '@/components/header/HeaderSearch';
import CardSlider2 from '@/components/card/cardSlider2';
import Footer from '@/components/footer/footer';
import ProgramNavigation from '@/components/menu/donasiMenu';
import '../utils/translate/i18n';
import { LoadingScreen } from '@/components/loading/loadingScreen';
import axios from 'axios';

export default function CharityHome() {
  const [campaigns, setCampaigns] = useState([]);
  const [campaignCard1, setCampaignCard1] = useState([]);
  const [campaignCard2, setCampaignCard2] = useState([]);
  const [campaignCard3, setCampaignCard3] = useState([]);
  const [campaignCard4, setCampaignCard4] = useState([]);
  const [campaignCard5, setCampaignCard5] = useState([]);
  const [campaignCard6, setCampaignCard6] = useState([]);
  const [articleCard, setArticleCard] = useState([]);
  const [dynamicSection, setDynamicSection] = useState([]);
  const [loadingSelectedCampaign, setLoadingSelectedCampaign] = useState(true);

  const fetchSelectedCampaign = async () => {
    setLoadingSelectedCampaign(true);
    try {
      const campaignsArray = [
        { setter: setCampaignCard1, section: 'section1' },
        { setter: setCampaignCard2, section: 'section2' },
        { setter: setCampaignCard3, section: 'section3' },
        { setter: setCampaignCard4, section: 'section4' },
        { setter: setCampaignCard5, section: 'section5' },
        { setter: setCampaignCard6, section: 'section6' },
      ];

      for (const { setter, section } of campaignsArray) {
        const matchedSection = dynamicSection.find((sec) => sec.section === section);
        if (matchedSection) {
          const requestData = {
            companyId: 'vrWcmcy7wEw1BUkQP3l9',
            projectId: 'HWMHbyA6S12FXzVwcru7',
            ...(matchedSection.tags && { tags: matchedSection.tags }),
          };


          const response = await axios.post('/api/v1/article/read', requestData);
          if (response?.data?.data) {
            setter({ ...matchedSection, article: response.data.data });
          } else {
            setter({ ...matchedSection, article: [] });
          }
        } else {
          setter({ article: [] });
        }
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setLoadingSelectedCampaign(false);
    }
  };

  const getArticles = async () => {
    try {
      const res = await axios.post('/api/v1/blogArticle/read', {
        companyId: 'vrWcmcy7wEw1BUkQP3l9',
        projectId: 'HWMHbyA6S12FXzVwcru7',
      });


      if (res?.data?.data.length > 0) {
        setArticleCard(res.data.data);
      } else {
        setArticleCard([]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  const getCategories = async () => {
    try {
      const res = await axios.post('/api/v1/categories/read', {
        projectId: 'HWMHbyA6S12FXzVwcru7',
      });


      if (res?.data?.data.length > 0) {
        setDynamicSection(res.data.data);
      } else {
        setDynamicSection([]);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  useEffect(() => {
    if (dynamicSection.length > 0) {
      fetchSelectedCampaign();
      getArticles();
    }
  }, [dynamicSection]);


  if (loadingSelectedCampaign) return <LoadingScreen />;
  return (
    <div>
      <Header />

      <main className='mt-16'>
        <HeaderSlider campaignsSelected={campaignCard1?.article || []} />
        <ProgramNavigation />
        <CardSlider
          Header={campaignCard2?.name || 'Section 2'}
          Data={campaignCard2 || null}
          campaignsSelected={campaignCard2?.article || []}
        />
        <HeaderSlider campaignsSelected={campaignCard3?.article || []} />
        <CardSlider
          Header={campaignCard4?.name || 'Section 4'}
          Data={campaignCard4}
          campaignsSelected={campaignCard4?.article || []}
        />
        <CardList
          Header={campaignCard5?.name || 'Section 5'}
          campaignsSelected={campaignCard5?.article || []}
        />
        <CardSlider2
          Header={campaignCard6?.name || 'Section 6'}
          articleCard={articleCard || []}
        />

        <Footer />
      </main>
    </div>
  );
}

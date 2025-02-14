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
      const allTags = dynamicSection.reduce((tags, section) => {
        if (section.tags) {
          tags.push(...section.tags);
        }
        return tags;
      }, []);

      const uniqueTags = [...new Set(allTags)];
      const response = await axios.post('/api/v1/article/read', {
        companyId: 'vrWcmcy7wEw1BUkQP3l9',
        projectId: 'HWMHbyA6S12FXzVwcru7',
        tags: uniqueTags,
      });

      const allArticles = response?.data?.data || [];

      const sectionSetters = {
        section1: setCampaignCard1,
        section2: setCampaignCard2,
        section3: setCampaignCard3,
        section4: setCampaignCard4,
        section5: setCampaignCard5,
        section6: setCampaignCard6,
      };

      // Distribute articles to their respective sections
      dynamicSection.forEach((section) => {
        const setter = sectionSetters[section.section];
        if (setter) {
          // Filter articles based on section tags
          const sectionArticles = section.tags ? allArticles.filter((article) => article.tags && article.tags.some((tag) => section.tags.includes(tag))) : [];

          setter({
            ...section,
            article: sectionArticles,
          });
        }
      });
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

  // Find sections for each button
  const findSectionByButton = (buttonNumber) => {
    return dynamicSection.find((section) => section.section === `button${buttonNumber}`);
  };

  if (loadingSelectedCampaign) return <LoadingScreen />;
  return (
    <div>
      <Header />
      <main className='mt-16'>
        <HeaderSlider campaignsSelected={campaignCard1?.article || []} />
        <ProgramNavigation
          button1={findSectionByButton(1)}
          button2={findSectionByButton(2)}
          button3={findSectionByButton(3)}
          button4={findSectionByButton(4)}
        />
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

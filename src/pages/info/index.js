import React, { useEffect, useState } from 'react';
import Header from '@/components/header/HeaderSearch';
import CardSlider2 from '@/components/card/cardSlider2';
import Footer from '@/components/footer/footer';
import CardBig from '@/components/card/cardBig';
import axios from 'axios';
import { LoadingScreen } from '@/components/loading/loadingScreen';

export default function InfoPage() {
  const [articleCard, setArticleCard] = useState([]);
  const [campaignCard6, setCampaignCard6] = useState([]);
  const [dynamicSection, setDynamicSection] = useState([]);
  const [loadingSelectedCampaign, setLoadingSelectedCampaign] = useState(true);

  const fetchSelectedCampaign = async () => {
    setLoadingSelectedCampaign(true);
    try {
      const campaignsArray = [{ setter: setCampaignCard6, section: 'section6' }];

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

      <main className=' mt-16'>
        <CardBig articleCard={articleCard || []} />
        <CardSlider2
          Header={campaignCard6?.name || 'Section 6'}
          articleCard={articleCard || []}
        />
        <Footer />
      </main>
    </div>
  );
}

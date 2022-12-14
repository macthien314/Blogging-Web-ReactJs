import React from "react";
import styled from "styled-components";
import { Button } from "../../components/button";

const HomeBannerStyles = styled.div`
  min-height: 520px;
  padding: 40px 0;
  background-image: linear-gradient(
    to right bottom,
    ${(props) => props.theme.primary},
    ${(props) => props.theme.secondary}
  );
  margin-bottom: 60px;
  .banner {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .banner-content {
    max-width: 600px;
    color: white;
  }
  .banner-heading{
    font-size: 36px;
    margin-bottom: 20px;
    font-weight: bold;
  }
  .banner-desc{
    line-height: 1.75;
    margin-bottom: 40px;
  }
  @media screen and (max-width: 1023.98px) {
    .banner {
      flex-direction: column;
      min-height: unset;
      &-heading {
        font-size: 30px;
        margin-bottom: 10px;
        font-weight: bold;
      }
      &-desc {
        font-size: 14px;
        margin-bottom: 20px;
      }
      &-image {
        margin-top:0;
        /* margin-top: 25px; */
      }
      &-button {
        font-size: 14px;
        height: auto;
        padding: 25px;
        /* padding: 15px; */
      }
    }
  }
`;

const HomeBanner = () => {
  return (
    <HomeBannerStyles>
    <div className="container">
    <div className="banner">
      <div className="banner-content">
        <h1 className="banner-heading">Monkey Blogging</h1>
        <p className="banner-desc">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur
          animi eveniet possimus saepe ullam ex, eligendi iste itaque beatae
          odit. Cum, saepe corporis ullam at aspernatur culpa magni obcaecati?
          Debitis. Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
          quaerat nobis sapiente vitae eaque blanditiis, beatae accusantium
          aliquam animi asperiores impedit officiis vero quibusdam molestias
          sunt modi consequatur suscipit itaque.
        </p>
        <Button to="/sign-up" kind="secondary" className="banner-button">
              Get started
        </Button>
      </div>
      <div className="banner-image">
        <img src="/img-banner.png" alt="banner" />
      </div>
      </div>
    </div> 
    </HomeBannerStyles>
  );
};

export default HomeBanner;

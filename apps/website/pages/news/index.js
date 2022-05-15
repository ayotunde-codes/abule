import React from 'react';
import Layout from '../../components/general/Layout';
import {
  InputPicker
} from '@abule-common/components';


class News extends React.Component {
  render() {
    return (
      <Layout
        website
        header={{
          darkTheme: true,
        }}
      >
        <div className="page-container">
          <div className="news-intro-col">
            <h3 className="web-page-title">News</h3>

            <ul className="news-nav">
              <li className="news-nav-list"><a href="#" className="news-nav-link">All</a></li>
              <li className="news-nav-list"><a href="#" className="news-nav-link active-nav-link"> Articles</a></li>
              <li className="news-nav-list"><a href="#" className="news-nav-link">Podcasts</a></li>
              <li className="news-nav-list"><a href="#" className="news-nav-link">Media</a></li>
            </ul>

            <InputPicker></InputPicker>
          </div>

          <div className="news-column">
            <div className="news-sub">
              <img src="" alt="" className="news-sub-img" />
              <div className="news-sub-info">
                <h3 className="news-sub-title">
                  Get Over the Awkward Ask! The Calvary Won’t Come Unless You Build it
                </h3>
                <p className="news-sub-paragraph">
                  Enjoy the flexibility of raising your family on your own terms.
                  The more you help others, the more you earn.
                  Enjoy the flexibility of raising your family on your own terms.
                  The more you help others, the more you earn.
                </p>

                <a href="" className="news-sub-link">Read More <span className="news-arrow">&#8594;</span></a>
              </div>
            </div>
            <div className="news-sub">
              <img src="" alt="" className="news-sub-img" />
              <div className="news-sub-info">
                <h3 className="news-sub-title">
                  Beat the Blues! Finding the Support you Need to Thrive as a Modern Parent
                </h3>
                <p className="news-sub-paragraph">
                  Feel great knowing that you are helping others with what matters most.
                  Needs come in all shapes and forms. The more you help others, the more you earn.
                  Enjoy the flexibility of raising your family on your own terms.
                </p>
                <a href="" className="news-sub-link">Read More <span className="news-arrow">&#8594;</span></a>
              </div>
            </div>
            <div className="news-sub">
              <img src="" alt="" className="news-sub-img" />
              <div className="news-sub-info">
                <h3 className="news-sub-title">Get Over the Awkward Ask! The Calvary Won’t Come Unless You Build it</h3>
                <p className="news-sub-paragraph">
                  Enjoy the flexibility of raising your family on your own terms.
                  The more you help others, the more you earn.
                  Enjoy the flexibility of raising your family on your own terms.
                  The more you help others, the more you earn.
                </p>
                <a href="" className="news-sub-link">Read More <span className="news-arrow">&#8594;</span></a>
              </div>
            </div>
            <div className="news-sub">
              <img src="" alt="" className="news-sub-img" />
              <div className="news-sub-info">
                <h3 className="news-sub-title">
                  Beat the Blues! Finding the Support you Need to Thrive as a Modern Parent
                </h3>
                <p className="news-sub-paragraph">
                  Feel great knowing that you are helping others with what matters most.
                  Needs come in all shapes and forms. The more you help others, the more you earn.
                  Enjoy the flexibility of raising your family on your own terms.
                </p>
                <a href="" className="news-sub-link">Read More <span className="news-arrow">&#8594;</span></a>
              </div>
            </div>
          </div>

          <div className="mail-list-block">
            <h3 className="mail-list-title">
              Keep abreast with us. <br />
              Be the first to hear the village <span className="mail-list-font timberline-font">Gossips</span>
            </h3>
            <button className="btn btn-1 mail-list-btn">Join our mailing list</button>
          </div>

          <div className="news-feature-column">
            <h3 className="feature-title">Featured in</h3>
            <div className="feature-block">

            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default News;

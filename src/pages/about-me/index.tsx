import type { NextPage } from 'next';
import Head from 'next/head';
import PageLayout from 'common/layout';
import ModuleContainer from 'common/shared/module-container';
import UserController from 'controller/user-controller';
import parse from 'html-react-parser';
import { IoLogoFacebook, IoLogoInstagram, IoLogoGithub, IoLogoLinkedin } from 'react-icons/io5';
import Button from 'common/ui/Button';

type AboutMeProps = {
    introduction?: string;
    cv?: string;
};

const userController = ModuleContainer.resolve(UserController);

const AboutMe: NextPage<AboutMeProps> = (props) => {
    const { introduction, cv } = props;

    const handleClickVisit = (url: string) => {
        window.open(url, '_blank');
    };

    return (
        <PageLayout>
            <Head>
                <title>Blog | About me</title>
            </Head>
            <div className="responsive">
                {introduction && (
                    <>
                        <div className="about-me-title">Hello, I am here</div>
                        <p>{introduction}</p>
                    </>
                )}
                <div className="flex justify-center">
                    <div className="about-me-visit">
                        <Button
                            mode="text"
                            onClick={() => handleClickVisit('https://facebook.com/tunglexuan23')}>
                            <IoLogoFacebook size={36} />
                        </Button>
                        <Button
                            mode="text"
                            onClick={() => handleClickVisit('https://instagram.com/xuantung_24')}>
                            <IoLogoInstagram size={36} />
                        </Button>
                        <Button
                            mode="text"
                            onClick={() => handleClickVisit('https://github.com/lexuantunght')}>
                            <IoLogoGithub size={36} />
                        </Button>
                        <Button
                            mode="text"
                            onClick={() => handleClickVisit('https://www.linkedin.com/in/tlx-it')}>
                            <IoLogoLinkedin size={36} />
                        </Button>
                    </div>
                </div>
                {cv && (
                    <>
                        <div className="about-me-title">More information in my CV</div>
                        <div className="mb-8">{parse(cv)}</div>
                    </>
                )}
            </div>
        </PageLayout>
    );
};

export const getServerSideProps = async () => {
    const { introduction, cv } = await userController.getAboutMe();
    return {
        props: {
            introduction,
            cv,
        },
    };
};

export default AboutMe;

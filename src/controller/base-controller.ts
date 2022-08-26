export default interface BaseController {
    getServerSideProps?: () => Promise<unknown>;
}

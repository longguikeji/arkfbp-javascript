import { IFNode } from '../../../../../../ark/src/ifNode'

export class CheckGithubData extends IFNode {

    parseLinkHeader(header: string) {
        if (header.length === 0) {
            throw new Error('input must not be of zero length')
        }

        // Split parts by comma
        const parts = header.split(',')
        const links: any = {}
        // Parse each part into a named link
        parts.forEach((p) => {
            const section = p.split(';')
            if (section.length !== 2) {
                throw new Error("section could not be split on ';'");
            }
            const url = section[0].replace(/<(.*)>/, '$1').trim()
            const name = section[1].replace(/rel="(.*)"/, '$1').trim()
            links[name] = url
        })

        return links
    }

    expression() {
        const links = this.parseLinkHeader(this.inputs.headers.link)

        this.$state.commit((state: any) => {
            state.link = links.next
            return state
        })

        if (links.next) {
            return true
        }

        return false
    }

}
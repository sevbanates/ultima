import { DefaultUrlSerializer, UrlSerializer, UrlTree } from "@angular/router";

export class LowerCaseUrlSerializer implements UrlSerializer {
    private defaultSerializer: DefaultUrlSerializer = new DefaultUrlSerializer();

     
    parse(url: string): UrlTree {
        return this.defaultSerializer.parse(url.toLowerCase());
    }
    
    serialize(tree: UrlTree): string {
        return this.defaultSerializer.serialize(tree).toLowerCase();
    }
    // parse(url: string): UrlTree {
    //     const index = url.toLowerCase().indexOf('/details/');
    //     if (index >= 0) {
    //         const beforeDetails = url.substring(0, index).toLowerCase();
    //         const afterDetails = url.substring(index);
    //         url = beforeDetails + afterDetails;
    //     } else {
    //         url = url.toLowerCase();
    //     }
    //     return this.defaultSerializer.parse(url);
    // }

    // serialize(tree: UrlTree): string {
    //     const path = this.defaultSerializer.serialize(tree);
    //     const index = path.toLowerCase().indexOf('/details/');
    //     if (index >= 0) {
    //         const beforeDetails = path.substring(0, index).toLowerCase();
    //         const afterDetails = path.substring(index);
    //         return beforeDetails + afterDetails;
    //     }
    //     return path.toLowerCase();
    // }
    
}
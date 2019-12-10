// src/pages/controller.ts
import { JsonController, Get, Put, Body, Param, Post, HttpCode } from 'routing-controllers'
import pagesById, { Page } from './data'


type PageList = Page[]
// this makes sure a class is marked as controller that always returns JSON
// perfect for our REST API
@JsonController()
export default class PageController {
  @Get("/pages")
  allPages(): PageList {
    return Object.values(pagesById)
  }

  @Put('/pages/:id')
  updatePage(
    @Param('id') id: number,
    @Body() body: Partial<Page>
  ): Page {
    console.log(`Incoming PUT body param:`, body)
    return pagesById[id]
  }

  @Post('/pages')
  @HttpCode(201)
  createPage(
    @Body() body: Page
  ): Page {
    console.log(`Incoming POST body param:`, body)
    return body
  }

  // this markes a method as endpoint
  // in this case it responds to any GET /pages/:id
  // request with :id being a variable parameter
  @Get('/pages/:id')
  getPage(
    // this decorator retrieves the ID parameter from the url
    @Param('id') id: number
  ): Page {
    return pagesById[id]
  }
}
